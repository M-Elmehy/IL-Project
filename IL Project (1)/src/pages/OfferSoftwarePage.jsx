
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MonitorPlay, DollarSign, Tag, Plus, X, CheckCircle, ListChecks, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSoftware } from '@/hooks/useSoftware';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/use-toast';

const FormField = ({ id, label, children, error }) => (
  <div>
    <Label htmlFor={id} className="text-base font-medium">{label}</Label>
    <div className="mt-1">{children}</div>
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);

const FeaturesInput = ({ features, setFeatures, error, placeholder }) => {
  const [newFeature, setNewFeature] = useState('');

  const addFeature = () => {
    if (newFeature.trim() && !features.includes(newFeature.trim())) {
      setFeatures(prev => [...prev, newFeature.trim()]);
      setNewFeature('');
    }
  };

  const removeFeature = (featureToRemove) => {
    setFeatures(prev => prev.filter(feature => feature !== featureToRemove));
  };

  return (
    <div>
      <Label className="text-base font-medium">Key Features / Specifications</Label>
      <div className="mt-1">
        <div className="flex">
          <Input
            placeholder={placeholder || "Add a feature or specification"}
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            className={error ? "border-red-500" : ""}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addFeature(); }}}
          />
          <Button type="button" onClick={addFeature} className="ml-2"><Plus className="h-4 w-4" /></Button>
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        <div className="flex flex-wrap gap-2 mt-3">
          {features.map((feature) => (
            <div key={feature} className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium flex items-center">
              {feature}
              <button type="button" onClick={() => removeFeature(feature)} className="ml-1 text-green-700 hover:text-green-900"><X className="h-3 w-3" /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


const OfferSoftwarePage = () => {
  const navigate = useNavigate();
  const { addSoftware, softwareCategories } = useSoftware();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [softwareData, setSoftwareData] = useState({
    name: '', description: '', category: '', price: '', licensing: 'Subscription', features: [], compatibility: []
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!user) {
    navigate('/login');
    toast({ title: "Authentication required", description: "Please log in to offer software.", variant: "destructive" });
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSoftwareData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleSelectChange = (name, value) => {
    setSoftwareData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!softwareData.name.trim()) newErrors.name = "Software name is required";
    if (!softwareData.description.trim()) newErrors.description = "Description is required";
    if (!softwareData.category) newErrors.category = "Category is required";
    if (softwareData.price && (isNaN(softwareData.price) || Number(softwareData.price) < 0)) newErrors.price = "Price must be a non-negative number";
    if (!softwareData.licensing) newErrors.licensing = "Licensing model is required";
    if (softwareData.features.length === 0) newErrors.features = "At least one feature is required";
    if (softwareData.compatibility.length === 0) newErrors.compatibility = "At least one compatibility/requirement is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    const completeSoftwareData = { ...softwareData, price: softwareData.price ? Number(softwareData.price) : 0, owner: { id: user.id, name: user.name || user.email.split('@')[0], avatar: user.avatar || 'https://randomuser.me/api/portraits/men/1.jpg' }};
    const newSw = await addSoftware(completeSoftwareData);
    setIsSubmitting(false);
    if (newSw) navigate(`/software/${newSw.id}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Offer Simulation Software</h1>
            <p className="text-gray-600">List your software for the SimHub community.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <FormField id="name" label="Software Name" error={errors.name}>
                  <Input id="name" name="name" placeholder="e.g., AdvancedFlightSim Pro" value={softwareData.name} onChange={handleChange} className={errors.name ? "border-red-500" : ""} />
                </FormField>
                <FormField id="description" label="Description" error={errors.description}>
                  <textarea id="description" name="description" rows={4} placeholder="Detailed description of your software..." value={softwareData.description} onChange={handleChange} className={`w-full rounded-md border ${errors.description ? "border-red-500" : "border-input"} bg-background px-3 py-2 text-sm`} />
                </FormField>
                <FormField id="category" label="Category" error={errors.category}>
                  <Select value={softwareData.category} onValueChange={(value) => handleSelectChange('category', value)}>
                    <SelectTrigger className={errors.category ? "border-red-500" : ""}><SelectValue placeholder="Select software category" /></SelectTrigger>
                    <SelectContent>{softwareCategories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}</SelectContent>
                  </Select>
                </FormField>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField id="price" label="Price (USD, leave blank if free or custom quote)" error={errors.price}>
                    <div className="relative"><DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" /><Input id="price" name="price" type="number" placeholder="e.g., 499" value={softwareData.price} onChange={handleChange} className={`pl-10 ${errors.price ? "border-red-500" : ""}`} /></div>
                  </FormField>
                  <FormField id="licensing" label="Licensing Model" error={errors.licensing}>
                    <Select value={softwareData.licensing} onValueChange={(value) => handleSelectChange('licensing', value)}>
                      <SelectTrigger className={errors.licensing ? "border-red-500" : ""}><SelectValue placeholder="Select licensing model" /></SelectTrigger>
                      <SelectContent><SelectItem value="Subscription">Subscription</SelectItem><SelectItem value="One-time Purchase">One-time Purchase</SelectItem><SelectItem value="Open Source">Open Source</SelectItem><SelectItem value="Custom">Custom</SelectItem></SelectContent>
                    </Select>
                  </FormField>
                </div>
                <FeaturesInput features={softwareData.features} setFeatures={(newFeatures) => setSoftwareData(prev => ({...prev, features: newFeatures}))} error={errors.features} placeholder="Add a key feature"/>
                <FeaturesInput features={softwareData.compatibility} setFeatures={(newComp) => setSoftwareData(prev => ({...prev, compatibility: newComp.map(c => ({system: c, details: 'N/A'}))}))} error={errors.compatibility} placeholder="Add compatibility (e.g., Windows 10, Unity Engine)"/>

                <div className="pt-4">
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? <><div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>Listing Software...</> : <><MonitorPlay className="mr-2 h-4 w-4" />List Software</>}
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

export default OfferSoftwarePage;
