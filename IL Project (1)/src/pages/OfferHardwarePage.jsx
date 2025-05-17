
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cpu, DollarSign, Tag, Plus, X, CheckCircle, MapPin, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useHardware } from '@/hooks/useHardware';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/use-toast';

const FormField = ({ id, label, children, error }) => (
  <div>
    <Label htmlFor={id} className="text-base font-medium">{label}</Label>
    <div className="mt-1">{children}</div>
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);

const SpecsInput = ({ specs, setSpecs, error, placeholder }) => {
  const [newSpecName, setNewSpecName] = useState('');
  const [newSpecValue, setNewSpecValue] = useState('');

  const addSpec = () => {
    if (newSpecName.trim() && newSpecValue.trim() && !specs.find(s => s.name === newSpecName.trim())) {
      setSpecs(prev => [...prev, { name: newSpecName.trim(), value: newSpecValue.trim() }]);
      setNewSpecName('');
      setNewSpecValue('');
    }
  };

  const removeSpec = (specNameToRemove) => {
    setSpecs(prev => prev.filter(spec => spec.name !== specNameToRemove));
  };

  return (
    <div>
      <Label className="text-base font-medium">Key Features / Specifications</Label>
      <div className="mt-1 space-y-2">
        <div className="flex gap-2">
          <Input placeholder={placeholder || "Feature/Spec Name"} value={newSpecName} onChange={(e) => setNewSpecName(e.target.value)} className={error ? "border-red-500" : ""} />
          <Input placeholder="Value / Details" value={newSpecValue} onChange={(e) => setNewSpecValue(e.target.value)} className={error ? "border-red-500" : ""} />
          <Button type="button" onClick={addSpec} className="shrink-0"><Plus className="h-4 w-4" /></Button>
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        <div className="flex flex-wrap gap-2 mt-3">
          {specs.map((spec) => (
            <div key={spec.name} className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm font-medium flex items-center">
              {spec.name}: {spec.value}
              <button type="button" onClick={() => removeSpec(spec.name)} className="ml-2 text-purple-700 hover:text-purple-900"><X className="h-3 w-3" /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


const OfferHardwarePage = () => {
  const navigate = useNavigate();
  const { addHardware, hardwareCategories } = useHardware();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [hardwareData, setHardwareData] = useState({
    name: '', description: '', category: '', price: '', rentalTerms: 'Daily', condition: 'New', location: '', features: [], specifications: []
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!user) {
    navigate('/login');
    toast({ title: "Authentication required", description: "Please log in to offer hardware.", variant: "destructive" });
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHardwareData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleSelectChange = (name, value) => {
    setHardwareData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!hardwareData.name.trim()) newErrors.name = "Hardware name is required";
    if (!hardwareData.description.trim()) newErrors.description = "Description is required";
    if (!hardwareData.category) newErrors.category = "Category is required";
    if (hardwareData.price && (isNaN(hardwareData.price) || Number(hardwareData.price) < 0)) newErrors.price = "Price must be a non-negative number";
    if (!hardwareData.rentalTerms) newErrors.rentalTerms = "Rental terms are required";
    if (!hardwareData.condition) newErrors.condition = "Condition is required";
    if (!hardwareData.location.trim()) newErrors.location = "Location is required";
    if (hardwareData.features.length === 0 && hardwareData.specifications.length === 0) newErrors.features = "At least one feature or specification is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    const completeHardwareData = { ...hardwareData, price: hardwareData.price ? Number(hardwareData.price) : 0, owner: { id: user.id, name: user.name || user.email.split('@')[0], avatar: user.avatar || 'https://randomuser.me/api/portraits/men/1.jpg' }};
    const newHw = await addHardware(completeHardwareData);
    setIsSubmitting(false);
    if (newHw) navigate(`/hardware/${newHw.id}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Offer Simulation Hardware</h1>
            <p className="text-gray-600">List your hardware rigs or components for the SimHub community.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <FormField id="name" label="Hardware Name / Title" error={errors.name}>
                  <Input id="name" name="name" placeholder="e.g., Full Motion Flight Simulator Rig" value={hardwareData.name} onChange={handleChange} className={errors.name ? "border-red-500" : ""} />
                </FormField>
                <FormField id="description" label="Description" error={errors.description}>
                  <textarea id="description" name="description" rows={4} placeholder="Detailed description of your hardware, capabilities, and components..." value={hardwareData.description} onChange={handleChange} className={`w-full rounded-md border ${errors.description ? "border-red-500" : "border-input"} bg-background px-3 py-2 text-sm`} />
                </FormField>
                <FormField id="category" label="Category" error={errors.category}>
                  <Select value={hardwareData.category} onValueChange={(value) => handleSelectChange('category', value)}>
                    <SelectTrigger className={errors.category ? "border-red-500" : ""}><SelectValue placeholder="Select hardware category" /></SelectTrigger>
                    <SelectContent>{hardwareCategories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}</SelectContent>
                  </Select>
                </FormField>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField id="price" label="Rental Price (USD, per rental term, leave blank if N/A)" error={errors.price}>
                    <div className="relative"><DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" /><Input id="price" name="price" type="number" placeholder="e.g., 150" value={hardwareData.price} onChange={handleChange} className={`pl-10 ${errors.price ? "border-red-500" : ""}`} /></div>
                  </FormField>
                  <FormField id="rentalTerms" label="Rental Terms" error={errors.rentalTerms}>
                    <Select value={hardwareData.rentalTerms} onValueChange={(value) => handleSelectChange('rentalTerms', value)}>
                      <SelectTrigger className={errors.rentalTerms ? "border-red-500" : ""}><SelectValue placeholder="Select rental terms" /></SelectTrigger>
                      <SelectContent><SelectItem value="Daily">Daily</SelectItem><SelectItem value="Weekly">Weekly</SelectItem><SelectItem value="Monthly">Monthly</SelectItem><SelectItem value="Project-based">Project-based</SelectItem><SelectItem value="Custom">Custom</SelectItem></SelectContent>
                    </Select>
                  </FormField>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField id="condition" label="Condition" error={errors.condition}>
                    <Select value={hardwareData.condition} onValueChange={(value) => handleSelectChange('condition', value)}>
                      <SelectTrigger className={errors.condition ? "border-red-500" : ""}><SelectValue placeholder="Select condition" /></SelectTrigger>
                      <SelectContent><SelectItem value="New">New</SelectItem><SelectItem value="Used - Like New">Used - Like New</SelectItem><SelectItem value="Used - Good">Used - Good</SelectItem><SelectItem value="Used - Fair">Used - Fair</SelectItem></SelectContent>
                    </Select>
                  </FormField>
                  <FormField id="location" label="Hardware Location" error={errors.location}>
                    <div className="relative"><MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" /><Input id="location" name="location" placeholder="City, Country" value={hardwareData.location} onChange={handleChange} className={`pl-10 ${errors.location ? "border-red-500" : ""}`} /></div>
                  </FormField>
                </div>
                <SpecsInput specs={hardwareData.specifications} setSpecs={(newSpecs) => setHardwareData(prev => ({...prev, specifications: newSpecs}))} error={errors.features} placeholder="Specification Name"/>
                
                <div className="pt-4">
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? <><div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>Listing Hardware...</> : <><Cpu className="mr-2 h-4 w-4" />List Hardware</>}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OfferHardwarePage;
