
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Tag, DollarSign, Calendar, Star, CheckCircle, AlertCircle, Download, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSoftware } from '@/hooks/useSoftware';
import { formatDate } from '@/lib/dateUtils';

const SoftwareDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getSoftwareById } = useSoftware();
  const software = getSoftwareById(id);

  if (!software) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <AlertCircle className="h-16 w-16 mx-auto text-red-500 mb-4" />
        <h1 className="text-2xl font-bold mb-4">Software Not Found</h1>
        <p className="text-gray-600 mb-8">The software you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/software')}><ArrowLeft className="mr-2 h-4 w-4" />Back to Software</Button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Link to="/software" className="inline-flex items-center text-gray-600 hover:text-primary mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />Back to Software Listings
          </Link>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 mb-6 md:mb-0 md:pr-6">
                <img  alt={software.name} className="w-full h-auto rounded-lg shadow-lg" src="https://images.unsplash.com/photo-1542837336-d14bdf342f9b" />
              </div>
              <div className="md:w-2/3">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{software.name}</h1>
                <p className="text-gray-600 mb-4">by {software.owner.name}</p>
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className={`h-5 w-5 ${i < Math.floor(software.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />)}
                  <span className="ml-2 text-gray-600">({software.reviews} reviews)</span>
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-gray-600 mb-4">
                  <div className="flex items-center"><Tag className="h-4 w-4 mr-2" /><span>{software.category}</span></div>
                  <div className="flex items-center"><DollarSign className="h-4 w-4 mr-2" /><span>{software.price === 0 ? 'Free' : software.price ? `$${software.price}` : 'Contact for Price'} ({software.licensing})</span></div>
                  <div className="flex items-center"><Calendar className="h-4 w-4 mr-2" /><span>Listed: {formatDate(software.postedDate, { year: 'numeric', month: 'short', day: 'numeric' })}</span></div>
                </div>
                <p className="text-gray-700 mb-6">{software.description}</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button className="flex items-center"><Download className="mr-2 h-4 w-4" />{software.price === 0 ? 'Download Now' : 'Get Quotation'}</Button>
                  <Button variant="outline" className="flex items-center"><MessageSquare className="mr-2 h-4 w-4" />Contact Owner</Button>
                </div>
              </div>
            </div>
          </div>

          <Tabs defaultValue="features" className="bg-white rounded-lg shadow-md">
            <TabsList className="w-full border-b p-0 rounded-t-lg">
              <TabsTrigger value="features" className="flex-1 rounded-none rounded-tl-lg data-[state=active]:border-b-2 data-[state=active]:border-primary">Features</TabsTrigger>
              <TabsTrigger value="compatibility" className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">Compatibility</TabsTrigger>
              <TabsTrigger value="reviews" className="flex-1 rounded-none rounded-tr-lg data-[state=active]:border-b-2 data-[state=active]:border-primary">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="features" className="p-6">
              <h2 className="text-xl font-semibold mb-4">Key Features</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {software.features.map(feature => <li key={feature} className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" />{feature}</li>)}
              </ul>
            </TabsContent>
            <TabsContent value="compatibility" className="p-6">
              <h2 className="text-xl font-semibold mb-4">System Requirements & Compatibility</h2>
              <div className="space-y-3 text-gray-700">
                {software.compatibility.map(comp => <p key={comp.system}><strong className="font-medium">{comp.system}:</strong> {comp.details}</p>)}
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="p-6">
              <h2 className="text-xl font-semibold mb-4">User Reviews</h2>
              {software.userReviews && software.userReviews.length > 0 ? (
                <div className="space-y-6">
                  {software.userReviews.map((review, index) => (
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
                <p className="text-gray-600">No reviews yet for this software.</p>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default SoftwareDetailsPage;
