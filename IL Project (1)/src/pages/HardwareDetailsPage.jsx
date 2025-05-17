
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Tag, DollarSign, Calendar, Star, CheckCircle, AlertCircle, Package, MessageSquare, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useHardware } from '@/hooks/useHardware';
import { formatDate } from '@/lib/dateUtils';

const HardwareDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getHardwareById } = useHardware();
  const hardware = getHardwareById(id);

  if (!hardware) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <AlertCircle className="h-16 w-16 mx-auto text-red-500 mb-4" />
        <h1 className="text-2xl font-bold mb-4">Hardware Not Found</h1>
        <p className="text-gray-600 mb-8">The hardware you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/hardware')}><ArrowLeft className="mr-2 h-4 w-4" />Back to Hardware</Button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Link to="/hardware" className="inline-flex items-center text-gray-600 hover:text-primary mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />Back to Hardware Listings
          </Link>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 mb-6 md:mb-0 md:pr-6">
                <img  alt={hardware.name} className="w-full h-auto rounded-lg shadow-lg" src="https://images.unsplash.com/photo-1464172061858-5d76c6455f5f" />
              </div>
              <div className="md:w-2/3">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{hardware.name}</h1>
                <p className="text-gray-600 mb-4">Offered by {hardware.owner.name}</p>
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className={`h-5 w-5 ${i < Math.floor(hardware.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />)}
                  <span className="ml-2 text-gray-600">({hardware.reviews} reviews)</span>
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-gray-600 mb-4">
                  <div className="flex items-center"><Tag className="h-4 w-4 mr-2" /><span>{hardware.category}</span></div>
                  <div className="flex items-center"><DollarSign className="h-4 w-4 mr-2" /><span>{hardware.price === 0 ? 'Free' : hardware.price ? `$${hardware.price}` : 'Contact for Price'} ({hardware.rentalTerms})</span></div>
                  <div className="flex items-center"><Calendar className="h-4 w-4 mr-2" /><span>Listed: {formatDate(hardware.postedDate, { year: 'numeric', month: 'short', day: 'numeric' })}</span></div>
                  <div className="flex items-center"><Package className="h-4 w-4 mr-2" /><span>Condition: {hardware.condition}</span></div>
                  <div className="flex items-center"><MapPin className="h-4 w-4 mr-2" /><span>Location: {hardware.location}</span></div>
                </div>
                <p className="text-gray-700 mb-6">{hardware.description}</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button className="flex items-center"><Package className="mr-2 h-4 w-4" />{hardware.price === 0 ? 'Request Access' : 'Inquire about Rental'}</Button>
                  <Button variant="outline" className="flex items-center"><MessageSquare className="mr-2 h-4 w-4" />Contact Owner</Button>
                </div>
              </div>
            </div>
          </div>

          <Tabs defaultValue="features" className="bg-white rounded-lg shadow-md">
            <TabsList className="w-full border-b p-0 rounded-t-lg">
              <TabsTrigger value="features" className="flex-1 rounded-none rounded-tl-lg data-[state=active]:border-b-2 data-[state=active]:border-primary">Features & Specs</TabsTrigger>
              <TabsTrigger value="availability" className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">Availability</TabsTrigger>
              <TabsTrigger value="reviews" className="flex-1 rounded-none rounded-tr-lg data-[state=active]:border-b-2 data-[state=active]:border-primary">User Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="features" className="p-6">
              <h2 className="text-xl font-semibold mb-4">Key Features & Specifications</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {hardware.features.map(feature => <li key={feature} className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" />{feature}</li>)}
              </ul>
              <Separator className="my-6"/>
              <h3 className="text-lg font-semibold mb-2">Specifications:</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {hardware.specifications.map(spec => <li key={spec.name}><strong>{spec.name}:</strong> {spec.value}</li>)}
              </ul>
            </TabsContent>
            <TabsContent value="availability" className="p-6">
              <h2 className="text-xl font-semibold mb-4">Rental Terms & Availability</h2>
              <p className="text-gray-700 mb-2"><strong>Rental Terms:</strong> {hardware.rentalTerms}</p>
              <p className="text-gray-700 mb-2"><strong>Availability:</strong> {hardware.availability}</p>
              <p className="text-gray-700">Contact the owner for specific scheduling and long-term arrangements.</p>
            </TabsContent>
            <TabsContent value="reviews" className="p-6">
              <h2 className="text-xl font-semibold mb-4">User Reviews</h2>
              {hardware.userReviews && hardware.userReviews.length > 0 ? (
                <div className="space-y-6">
                  {hardware.userReviews.map((review, index) => (
                    <div key={index} className="border-b pb-4">
                      <div className="flex items-center mb-1">
                        {[...Array(5)].map((_, i) => <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />)}
                        <span className="ml-2 font-semibold">{review.userName}</span>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">{formatDate(review.date, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No reviews yet for this hardware.</p>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default HardwareDetailsPage;
