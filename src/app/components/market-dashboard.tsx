import React, { useState } from 'react';
import { Search, ShoppingCart, Store, Sprout, Shield, CheckCircle, AlertCircle, Star, MapPin, Phone, TrendingUp, TrendingDown, Filter, X, BadgeCheck, Plus, Upload, DollarSign, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import NPKImage from '../../imports/NPK.jpg';
import DAPImage from '../../imports/DAP.jpg';
import CANImage from '../../imports/CAN.jpg';

interface MarketDashboardProps {
  region: string;
  language: 'en' | 'sw';
}

interface Product {
  id: string;
  name: string;
  category: 'inputs' | 'seedlings' | 'equipment' | 'livestock' | 'produce';
  price: number;
  unit: string;
  seller: string;
  sellerRating: number;
  location: string;
  phone: string;
  image?: string;
  inStock: boolean;
  isSubsidized?: boolean;
  isVerified?: boolean;
  isOriginal?: boolean;
  description: string;
}

type CategoryType = 'all' | 'inputs' | 'seedlings' | 'subsidized' | 'verified' | 'produce';
type MainView = 'marketplace' | 'intelligence' | 'sell';

export function MarketDashboard({ region, language }: MarketDashboardProps) {
  const [mainView, setMainView] = useState<MainView>('marketplace');
  const [subView, setSubView] = useState<'browse' | 'product-details' | 'verify'>('browse');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationResult, setVerificationResult] = useState<'valid' | 'invalid' | null>(null);
  const [selectedCrop, setSelectedCrop] = useState('maize');

  // Selling form state
  const [sellForm, setSellForm] = useState({
    productName: '',
    category: 'produce' as CategoryType,
    quantity: '',
    unit: 'kg',
    pricePerUnit: '',
    description: '',
    location: region,
  });
  const [sellSuccess, setSellSuccess] = useState(false);

  const translations = {
    en: {
      // Main navigation
      marketplace: 'Marketplace',
      intelligence: 'Market Intelligence',
      sellProduce: 'Sell Produce',
      
      // Marketplace
      search: 'Search for products, inputs, seedlings...',
      categories: 'Categories',
      all: 'All Products',
      farmInputs: 'Farm Inputs',
      seedlings: 'Seedlings',
      produce: 'Farm Produce',
      subsidized: 'Government Subsidized',
      verified: 'Verified Products',
      filters: 'Filters',
      inStock: 'In Stock',
      outOfStock: 'Out of Stock',
      original: 'Original',
      subsidy: 'Subsidy Available',
      verifiedBadge: 'Verified',
      viewDetails: 'View Details',
      contactSeller: 'Contact Seller',
      verifySeedling: 'Verify Seedling',
      verificationTitle: 'Seedling Verification',
      enterCode: 'Enter Verification Code',
      verify: 'Verify',
      validProduct: 'Valid Product',
      invalidProduct: 'Invalid Code',
      productDetails: 'Product Details',
      seller: 'Seller',
      location: 'Location',
      rating: 'Rating',
      description: 'Description',
      price: 'Price',
      back: 'Back',
      addToCart: 'Add to Cart',
      noResults: 'No products found',
      tryDifferent: 'Try a different search term',
      
      // Market Intelligence
      marketDashboard: 'Market Intelligence',
      currentPrices: 'Current Crop Prices',
      pricePerKg: 'Price per KG (KES)',
      priceTrend: 'Price Trend (Last 30 Days)',
      regionalComparison: 'Regional Price Comparison',
      maize: 'Maize',
      beans: 'Beans',
      potatoes: 'Potatoes',
      tomatoes: 'Tomatoes',
      cabbage: 'Cabbage',
      change: 'change',
      from: 'from',
      lastWeek: 'last week',
      
      // Selling
      listYourProduce: 'List Your Produce',
      productName: 'Product Name',
      category: 'Category',
      quantity: 'Quantity Available',
      pricePerUnit: 'Price per Unit',
      yourLocation: 'Your Location',
      productDescription: 'Product Description',
      uploadPhotos: 'Upload Photos',
      listProduct: 'List Product',
      yourListings: 'Your Active Listings',
      noListings: 'You have no active listings',
      edit: 'Edit',
      remove: 'Remove',
      listedSuccess: 'Product listed successfully!',
      viewInMarket: 'View in Marketplace',
    },
    sw: {
      // Main navigation
      marketplace: 'Soko',
      intelligence: 'Taarifa za Soko',
      sellProduce: 'Uza Mazao',
      
      // Marketplace
      search: 'Tafuta bidhaa, pembejeo, miche...',
      categories: 'Aina',
      all: 'Bidhaa Zote',
      farmInputs: 'Pembejeo za Kilimo',
      seedlings: 'Miche',
      produce: 'Mazao ya Shambani',
      subsidized: 'Ruzuku ya Serikali',
      verified: 'Bidhaa Zilizothibitishwa',
      filters: 'Chuja',
      inStock: 'Inapatikana',
      outOfStock: 'Haipo',
      original: 'Asili',
      subsidy: 'Ruzuku Inapatikana',
      verifiedBadge: 'Imethibitishwa',
      viewDetails: 'Angalia Maelezo',
      contactSeller: 'Wasiliana na Muuzaji',
      verifySeedling: 'Thibitisha Mche',
      verificationTitle: 'Uthibitishaji wa Mche',
      enterCode: 'Weka Nambari ya Uthibitishaji',
      verify: 'Thibitisha',
      validProduct: 'Bidhaa Halali',
      invalidProduct: 'Nambari si Sahihi',
      productDetails: 'Maelezo ya Bidhaa',
      seller: 'Muuzaji',
      location: 'Mahali',
      rating: 'Ukadiriaji',
      description: 'Maelezo',
      price: 'Bei',
      back: 'Rudi',
      addToCart: 'Ongeza kwenye Kikapu',
      noResults: 'Hakuna bidhaa zilizopatikana',
      tryDifferent: 'Jaribu neno lingine la utafutaji',
      
      // Market Intelligence
      marketDashboard: 'Taarifa za Soko',
      currentPrices: 'Bei za Sasa za Mazao',
      pricePerKg: 'Bei kwa KG (KES)',
      priceTrend: 'Mwenendo wa Bei (Siku 30 Zilizopita)',
      regionalComparison: 'Ulinganisho wa Bei za Mikoa',
      maize: 'Mahindi',
      beans: 'Maharage',
      potatoes: 'Viazi',
      tomatoes: 'Nyanya',
      cabbage: 'Kabichi',
      change: 'mabadiliko',
      from: 'kutoka',
      lastWeek: 'wiki iliyopita',
      
      // Selling
      listYourProduce: 'Orodhesha Mazao Yako',
      productName: 'Jina la Bidhaa',
      category: 'Aina',
      quantity: 'Kiasi Kinachopatikana',
      pricePerUnit: 'Bei kwa Kipimo',
      yourLocation: 'Mahali Pako',
      productDescription: 'Maelezo ya Bidhaa',
      uploadPhotos: 'Pakia Picha',
      listProduct: 'Orodhesha Bidhaa',
      yourListings: 'Orodha Zako Zinazofanya Kazi',
      noListings: 'Huna orodha zinazofanya kazi',
      edit: 'Hariri',
      remove: 'Ondoa',
      listedSuccess: 'Bidhaa imeorodheshwa!',
      viewInMarket: 'Angalia kwenye Soko',
    },
  };

  const t = translations[language];

  // Mock products database
  const allProducts: Product[] = [
    {
      id: '1',
      name: 'NPK 23:23:0 Fertilizer',
      category: 'inputs',
      price: 4500,
      unit: '50kg bag',
      seller: 'Mea Fertilizers Ltd',
      sellerRating: 4.8,
      location: 'Nakuru',
      phone: '+254 712 345 678',
      inStock: true,
      isOriginal: true,
      isVerified: true,
      description: 'High-quality NPK fertilizer ideal for maize and wheat. Government approved and tested.',
      image: NPKImage,
    },
    {
      id: '2',
      name: 'DAP Fertilizer (Subsidized)',
      category: 'inputs',
      price: 3200,
      unit: '50kg bag',
      seller: 'National Cereals Board',
      sellerRating: 5.0,
      location: 'Eldoret',
      phone: '+254 723 456 789',
      inStock: true,
      isSubsidized: true,
      isOriginal: true,
      isVerified: true,
      description: 'Government subsidized DAP fertilizer. Valid farmer ID required for purchase. Save 40% with subsidy.',
      image: DAPImage,
    },
    {
      id: '3',
      name: 'Hybrid Maize Seeds H614',
      category: 'inputs',
      price: 450,
      unit: '2kg pack',
      seller: 'Kenya Seed Company',
      sellerRating: 4.9,
      location: 'Nairobi',
      phone: '+254 734 567 890',
      inStock: true,
      isOriginal: true,
      isVerified: true,
      description: 'High-yielding hybrid maize variety. Drought resistant. Matures in 3.5-4 months.',
      image: 'https://images.unsplash.com/photo-1554402100-8d1d9f3dff80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWl6ZSUyMGNvcm4lMjBzZWVkc3xlbnwxfHx8fDE3ODA1NDQ2OTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: '4',
      name: 'Tomato Seedlings (F1 Hybrid)',
      category: 'seedlings',
      price: 15,
      unit: 'per seedling',
      seller: 'GreenLife Nurseries',
      sellerRating: 4.7,
      location: 'Kiambu',
      phone: '+254 745 678 901',
      inStock: true,
      isVerified: true,
      description: 'Premium F1 hybrid tomato seedlings. Disease resistant. Ready for transplanting.',
      image: 'https://images.unsplash.com/photo-1624905917414-6c1c376fc134?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b21hdG8lMjBzZWVkbGluZ3MlMjBncmVlbmhvdXNlfGVufDF8fHx8MTc4MDU0NDY5M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: '5',
      name: 'Fresh Maize - Grade A',
      category: 'produce',
      price: 45,
      unit: 'per kg',
      seller: 'John Kamau',
      sellerRating: 4.5,
      location: 'Nakuru',
      phone: '+254 722 111 222',
      inStock: true,
      description: 'Freshly harvested grade A maize. Properly dried and stored. Ready for collection.',
      image: 'https://images.unsplash.com/photo-1634467524884-897d0af5e104?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMG1haXplJTIwY29ybnxlbnwxfHx8fDE3ODA1NDQ2OTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: '6',
      name: 'Organic Tomatoes',
      category: 'produce',
      price: 60,
      unit: 'per kg',
      seller: 'Esther Njeri',
      sellerRating: 4.8,
      location: 'Kiambu',
      phone: '+254 733 222 333',
      inStock: true,
      description: 'Premium organic tomatoes. No pesticides used. Harvested this morning.',
      image: 'https://images.unsplash.com/photo-1582284540020-8acbe03f4924?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwdG9tYXRvZXMlMjBmcmVzaHxlbnwxfHx8fDE3ODA0NTU0OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: '7',
      name: 'Avocado Seedlings (Hass)',
      category: 'seedlings',
      price: 250,
      unit: 'per seedling',
      seller: 'Tropical Nursery',
      sellerRating: 4.6,
      location: 'Murang\'a',
      phone: '+254 756 789 012',
      inStock: true,
      isVerified: true,
      description: 'Certified Hass avocado seedlings. 6-8 months old. Grafted variety.',
      image: 'https://images.unsplash.com/photo-1622210445956-ca3320a5e7c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdm9jYWRvJTIwc2VlZGxpbmdzJTIwcGxhbnR8ZW58MXx8fHwxNzgwNTQ0Njk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: '8',
      name: 'Fresh Beans',
      category: 'produce',
      price: 120,
      unit: 'per kg',
      seller: 'Peter Mwangi',
      sellerRating: 4.6,
      location: 'Nakuru',
      phone: '+254 744 333 444',
      inStock: true,
      description: 'High-quality beans. Freshly harvested. Clean and sorted.',
      image: 'https://images.unsplash.com/photo-1564894809611-1742fc40ed80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGJlYW5zJTIwbGVndW1lc3xlbnwxfHx8fDE3ODA1NDQ2OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: '9',
      name: 'CAN Fertilizer (Subsidized)',
      category: 'inputs',
      price: 2800,
      unit: '50kg bag',
      seller: 'National Cereals Board',
      sellerRating: 5.0,
      location: 'Kitale',
      phone: '+254 723 456 789',
      inStock: true,
      isSubsidized: true,
      isOriginal: true,
      isVerified: true,
      description: 'Government subsidized CAN fertilizer. Ideal for top dressing. 35% discount applied.',
      image: CANImage,
    },
    {
      id: '10',
      name: 'Kale Seedlings',
      category: 'seedlings',
      price: 8,
      unit: 'per seedling',
      seller: 'GreenLife Nurseries',
      sellerRating: 4.7,
      location: 'Kiambu',
      phone: '+254 745 678 901',
      inStock: true,
      isVerified: true,
      description: 'Sukuma wiki variety. Hardy and fast growing.',
      image: 'https://images.unsplash.com/photo-1615671524827-c1fe3973b648?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrYWxlJTIwdmVnZXRhYmxlJTIwc2VlZGxpbmdzfGVufDF8fHx8MTc4MDU0NDY5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: '11',
      name: 'Fresh Potatoes',
      category: 'produce',
      price: 35,
      unit: 'per kg',
      seller: 'Grace Achieng',
      sellerRating: 4.7,
      location: 'Nakuru',
      phone: '+254 755 444 555',
      inStock: true,
      description: 'Farm-fresh potatoes. Various sizes available. Bulk orders welcome.',
      image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBvdGF0b2VzJTIwaGFydmVzdHxlbnwxfHx8fDE3ODA1NDQ2OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
  ];

  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === 'all' ? true :
      selectedCategory === 'subsidized' ? product.isSubsidized :
      selectedCategory === 'verified' ? product.isVerified :
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleVerify = () => {
    if (verificationCode.endsWith('123')) {
      setVerificationResult('valid');
    } else {
      setVerificationResult('invalid');
    }
  };

  const handleSellSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSellSuccess(true);
    setTimeout(() => {
      setSellSuccess(false);
      setSellForm({
        productName: '',
        category: 'produce',
        quantity: '',
        unit: 'kg',
        pricePerUnit: '',
        description: '',
        location: region,
      });
    }, 3000);
  };

  const categories = [
    { id: 'all' as CategoryType, label: t.all, icon: Store },
    { id: 'produce' as CategoryType, label: t.produce, icon: Sprout },
    { id: 'inputs' as CategoryType, label: t.farmInputs, icon: ShoppingCart },
    { id: 'seedlings' as CategoryType, label: t.seedlings, icon: Sprout },
    { id: 'subsidized' as CategoryType, label: t.subsidized, icon: TrendingUp },
    { id: 'verified' as CategoryType, label: t.verified, icon: Shield },
  ];

  // Market Intelligence data
  const cropPrices = [
    {
      id: 'maize',
      name: t.maize,
      price: 45,
      change: 5.2,
      trend: 'up',
    },
    {
      id: 'beans',
      name: t.beans,
      price: 120,
      change: -3.1,
      trend: 'down',
    },
    {
      id: 'potatoes',
      name: t.potatoes,
      price: 35,
      change: 2.8,
      trend: 'up',
    },
    {
      id: 'tomatoes',
      name: t.tomatoes,
      price: 55,
      change: -8.5,
      trend: 'down',
    },
    {
      id: 'cabbage',
      name: t.cabbage,
      price: 25,
      change: 1.5,
      trend: 'up',
    },
  ];

  const priceHistory = [
    { day: language === 'en' ? 'Day 1' : 'Siku 1', price: 38 },
    { day: language === 'en' ? 'Day 5' : 'Siku 5', price: 40 },
    { day: language === 'en' ? 'Day 10' : 'Siku 10', price: 39 },
    { day: language === 'en' ? 'Day 15' : 'Siku 15', price: 42 },
    { day: language === 'en' ? 'Day 20' : 'Siku 20', price: 43 },
    { day: language === 'en' ? 'Day 25' : 'Siku 25', price: 44 },
    { day: language === 'en' ? 'Day 30' : 'Siku 30', price: 45 },
  ];

  const regionalData = [
    { region: 'Nairobi', price: 47 },
    { region: 'Kisumu', price: 43 },
    { region: 'Mombasa', price: 49 },
    { region: 'Nakuru', price: 42 },
    { region: 'Eldoret', price: 40 },
  ];

  // Main view tabs
  const mainTabs = [
    { id: 'marketplace' as MainView, label: t.marketplace, icon: Store },
    { id: 'intelligence' as MainView, label: t.intelligence, icon: TrendingUp },
    { id: 'sell' as MainView, label: t.sellProduce, icon: DollarSign },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Main Navigation Dropdown */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-[#2D5016] mb-2">
          {language === 'en' ? 'Select View' : 'Chagua Muonekano'}
        </label>
        <div className="relative">
          <select
            value={mainView}
            onChange={(e) => {
              setMainView(e.target.value as MainView);
              if (e.target.value === 'marketplace') setSubView('browse');
            }}
            className="w-full px-4 py-3 pr-10 border-2 border-[#8B6F47] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#2D5016] text-base font-medium text-[#2D5016] appearance-none cursor-pointer"
          >
            {mainTabs.map((tab) => (
              <option key={tab.id} value={tab.id}>
                {tab.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#8B6F47] pointer-events-none" />
        </div>
      </div>

      {/* MARKETPLACE VIEW */}
      {mainView === 'marketplace' && subView === 'browse' && (
        <>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-5 mb-5"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-[#2D5016] flex items-center gap-2">
                <Store className="w-7 h-7" />
                {t.marketplace}
              </h2>
              <button
                onClick={() => setSubView('verify')}
                className="px-4 py-2 bg-[#2D5016] text-white rounded-lg hover:bg-[#3D6B1F] transition-colors flex items-center gap-2 text-sm font-medium"
              >
                <Shield className="w-4 h-4" />
                {t.verifySeedling}
              </button>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.search}
                className="w-full pl-12 pr-4 py-3 border-2 border-[#8B6F47] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D5016] text-base"
              />
            </div>
          </motion.div>

          {/* Categories Dropdown */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-[#2D5016] mb-2">{t.categories}</label>
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as CategoryType)}
                className="w-full px-4 py-3 pr-10 border-2 border-[#8B6F47] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#2D5016] text-base font-medium text-[#2D5016] appearance-none cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#8B6F47] pointer-events-none" />
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
                  onClick={() => {
                    setSelectedProduct(product);
                    setSubView('product-details');
                  }}
                >
                  {/* Product Image Placeholder */}
                  <div className={`h-28 bg-gradient-to-br ${
                    product.category === 'produce' ? 'from-green-600 to-green-800' :
                    product.category === 'seedlings' ? 'from-lime-600 to-lime-800' :
                    'from-[#2D5016] to-[#4A7C28]'
                  } flex items-center justify-center relative`}>
                    {product.image ? (
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ShoppingCart className="w-12 h-12 text-white opacity-30" />
                    )}
                    
                    {/* Badges */}
                    <div className="absolute top-1.5 right-1.5 flex flex-col gap-1">
                      {product.isSubsidized && (
                        <span className="bg-amber-500 text-white text-xs px-1.5 py-0.5 rounded-full font-bold flex items-center gap-0.5">
                          <TrendingUp className="w-2.5 h-2.5" />
                          <span className="text-xs">{language === 'en' ? 'Subsidy' : 'Ruzuku'}</span>
                        </span>
                      )}
                      {product.isVerified && (
                        <span className="bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full font-bold flex items-center gap-0.5">
                          <BadgeCheck className="w-2.5 h-2.5" />
                        </span>
                      )}
                      {product.isOriginal && (
                        <span className="bg-green-600 text-white text-xs px-1.5 py-0.5 rounded-full font-bold">
                          ✓
                        </span>
                      )}
                    </div>

                    {/* Stock Status */}
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{t.outOfStock}</span>
                      </div>
                    )}
                  </div>

                  <div className="p-3">
                    <h3 className="font-bold text-[#2D5016] mb-1.5 line-clamp-2 text-sm leading-tight">{product.name}</h3>
                    
                    <div className="flex items-baseline gap-1.5 mb-2">
                      <span className="text-xl font-bold text-[#2D5016]">
                        {product.price.toLocaleString()}
                      </span>
                      <span className="text-xs text-gray-500">KES/{product.unit}</span>
                    </div>

                    <div className="space-y-1.5 mb-2.5">
                      <div className="flex items-center gap-1.5 text-xs text-gray-600">
                        <Store className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{product.seller}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1 text-amber-600">
                          <Star className="w-3 h-3 fill-current" />
                          <span className="font-medium">{product.sellerRating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                          <MapPin className="w-3 h-3" />
                          <span>{product.location}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      className={`w-full py-1.5 rounded-md text-sm font-medium transition-colors ${
                        product.inStock
                          ? 'bg-[#2D5016] text-white hover:bg-[#3D6B1F]'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                      disabled={!product.inStock}
                    >
                      {product.inStock ? t.viewDetails : t.outOfStock}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-xl shadow-lg p-12 text-center"
            >
              <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">{t.noResults}</h3>
              <p className="text-gray-500">{t.tryDifferent}</p>
            </motion.div>
          )}
        </>
      )}

      {/* Product Details View */}
      {mainView === 'marketplace' && subView === 'product-details' && selectedProduct && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="p-5 border-b border-gray-200 flex items-center justify-between">
            <button
              onClick={() => setSubView('browse')}
              className="flex items-center gap-2 text-[#2D5016] hover:text-[#3D6B1F] font-medium"
            >
              <X className="w-5 h-5" />
              {t.back}
            </button>
            <h2 className="text-xl font-bold text-[#2D5016]">{t.productDetails}</h2>
          </div>

          <div className={`h-64 bg-gradient-to-br ${
            selectedProduct.category === 'produce' ? 'from-green-600 to-green-800' :
            selectedProduct.category === 'seedlings' ? 'from-lime-600 to-lime-800' :
            'from-[#2D5016] to-[#4A7C28]'
          } flex items-center justify-center relative`}>
            {selectedProduct.image ? (
              <img 
                src={selectedProduct.image} 
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <ShoppingCart className="w-24 h-24 text-white opacity-30" />
            )}
            
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              {selectedProduct.isSubsidized && (
                <span className="bg-amber-500 text-white text-sm px-3 py-1.5 rounded-full font-bold flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  {t.subsidy}
                </span>
              )}
              {selectedProduct.isVerified && (
                <span className="bg-blue-600 text-white text-sm px-3 py-1.5 rounded-full font-bold flex items-center gap-1">
                  <BadgeCheck className="w-4 h-4" />
                  {t.verifiedBadge}
                </span>
              )}
              {selectedProduct.isOriginal && (
                <span className="bg-green-600 text-white text-sm px-3 py-1.5 rounded-full font-bold">
                  {t.original}
                </span>
              )}
            </div>
          </div>

          <div className="p-6">
            <h1 className="text-3xl font-bold text-[#2D5016] mb-4">{selectedProduct.name}</h1>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-bold text-[#2D5016]">
                KES {selectedProduct.price.toLocaleString()}
              </span>
              <span className="text-lg text-gray-500">per {selectedProduct.unit}</span>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-[#2D5016] mb-2">{t.description}</h3>
              <p className="text-gray-700 leading-relaxed">{selectedProduct.description}</p>
            </div>

            <div className="bg-[#F5F1E8] rounded-xl p-5 mb-6">
              <h3 className="text-lg font-semibold text-[#2D5016] mb-4">{t.seller}</h3>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Store className="w-5 h-5 text-[#2D5016]" />
                  <span className="font-medium text-gray-800">{selectedProduct.seller}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-amber-500 fill-current" />
                  <span className="font-medium text-gray-800">
                    {selectedProduct.sellerRating} {t.rating}
                  </span>
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-[#2D5016]" />
                  <span className="text-gray-700">{selectedProduct.location}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#2D5016]" />
                  <a href={`tel:${selectedProduct.phone}`} className="text-blue-600 hover:underline">
                    {selectedProduct.phone}
                  </a>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                className="px-6 py-4 bg-white border-2 border-[#2D5016] text-[#2D5016] rounded-lg hover:bg-[#F5F1E8] transition-colors font-semibold flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                {t.contactSeller}
              </button>
              <button
                className="px-6 py-4 bg-[#2D5016] text-white rounded-lg hover:bg-[#3D6B1F] transition-colors font-semibold flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                {t.addToCart}
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Verification View */}
      {mainView === 'marketplace' && subView === 'verify' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#2D5016] flex items-center gap-2">
              <Shield className="w-7 h-7" />
              {t.verificationTitle}
            </h2>
            <button
              onClick={() => {
                setSubView('browse');
                setVerificationResult(null);
                setVerificationCode('');
              }}
              className="text-gray-500 hover:text-[#2D5016]"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="mb-6">
            <p className="text-gray-700 mb-4">
              {language === 'en' 
                ? 'Enter the verification code found on your seedling package to verify authenticity.' 
                : 'Weka nambari ya uthibitishaji iliyopatikana kwenye kifurushi cha mche wako kuthibitisha kuwa ni halali.'}
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#2D5016] mb-2">
                  {t.enterCode}
                </label>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => {
                    setVerificationCode(e.target.value);
                    setVerificationResult(null);
                  }}
                  placeholder="e.g., SL-2024-123"
                  className="w-full px-4 py-3 border-2 border-[#8B6F47] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D5016] text-lg font-mono"
                />
              </div>

              <button
                onClick={handleVerify}
                disabled={!verificationCode}
                className="w-full px-6 py-4 bg-[#2D5016] text-white rounded-lg hover:bg-[#3D6B1F] transition-colors font-semibold flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <Shield className="w-5 h-5" />
                {t.verify}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {verificationResult && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`p-6 rounded-xl border-2 ${
                  verificationResult === 'valid'
                    ? 'bg-green-50 border-green-500'
                    : 'bg-red-50 border-red-500'
                }`}
              >
                <div className="flex items-start gap-4">
                  {verificationResult === 'valid' ? (
                    <CheckCircle className="w-12 h-12 text-green-600 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-12 h-12 text-red-600 flex-shrink-0" />
                  )}
                  
                  <div className="flex-1">
                    <h3 className={`text-xl font-bold mb-2 ${
                      verificationResult === 'valid' ? 'text-green-800' : 'text-red-800'
                    }`}>
                      {verificationResult === 'valid' ? t.validProduct : t.invalidProduct}
                    </h3>
                    
                    {verificationResult === 'valid' ? (
                      <div className="space-y-2">
                        <p className="text-green-700">
                          {language === 'en'
                            ? 'This is a genuine certified seedling from an approved nursery.'
                            : 'Hii ni mche halali kutoka kwa nursery iliyoidhinishwa.'}
                        </p>
                        <div className="bg-white rounded-lg p-4 mt-3">
                          <p className="text-sm text-gray-700">
                            <strong>{language === 'en' ? 'Product:' : 'Bidhaa:'}</strong> Tomato F1 Hybrid Seedlings
                          </p>
                          <p className="text-sm text-gray-700">
                            <strong>{language === 'en' ? 'Nursery:' : 'Nursery:'}</strong> GreenLife Nurseries
                          </p>
                          <p className="text-sm text-gray-700">
                            <strong>{language === 'en' ? 'Batch:' : 'Batch:'}</strong> 2024-06-SL-123
                          </p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-red-700">
                        {language === 'en'
                          ? 'This verification code is not valid. Please check the code and try again, or contact the seller.'
                          : 'Nambari hii ya uthibitishaji si sahihi. Tafadhali angalia nambari na jaribu tena, au wasiliana na muuzaji.'}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* MARKET INTELLIGENCE VIEW */}
      {mainView === 'intelligence' && (
        <div>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6 mb-6"
          >
            <h2 className="text-2xl font-bold text-[#2D5016] flex items-center gap-2">
              <TrendingUp className="w-7 h-7" />
              {t.marketDashboard}
            </h2>
          </motion.div>

          {/* Current Prices Grid */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-[#2D5016] mb-4">{t.currentPrices}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cropPrices.map((crop) => (
                <motion.div
                  key={crop.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedCrop(crop.id)}
                  className={`bg-white rounded-xl shadow-lg p-5 cursor-pointer transition-all ${
                    selectedCrop === crop.id ? 'ring-4 ring-[#2D5016]' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-lg font-bold text-[#2D5016]">{crop.name}</h4>
                    {crop.trend === 'up' ? (
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                  
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-bold text-[#2D5016]">
                      {crop.price}
                    </span>
                    <span className="text-sm text-[#8B6F47]">KES/kg</span>
                  </div>

                  <div className={`text-sm font-medium ${
                    crop.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {crop.trend === 'up' ? '↑' : '↓'} {Math.abs(crop.change)}% {t.change}
                    <span className="text-[#8B6F47] ml-1">{t.from} {t.lastWeek}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Price Trend Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6 mb-6"
          >
            <h3 className="text-xl font-bold text-[#2D5016] mb-4">
              {t.priceTrend} - {cropPrices.find(c => c.id === selectedCrop)?.name}
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={priceHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8E4D9" />
                <XAxis 
                  dataKey="day" 
                  stroke="#8B6F47"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="#8B6F47"
                  style={{ fontSize: '12px' }}
                  label={{ 
                    value: t.pricePerKg, 
                    angle: -90, 
                    position: 'insideLeft',
                    style: { fill: '#2D5016' }
                  }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff',
                    border: '2px solid #2D5016',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#2D5016" 
                  strokeWidth={3}
                  dot={{ fill: '#4A7C28', r: 5 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Regional Comparison */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-xl font-bold text-[#2D5016] mb-4">
              {t.regionalComparison} - {cropPrices.find(c => c.id === selectedCrop)?.name}
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={regionalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8E4D9" />
                <XAxis 
                  dataKey="region" 
                  stroke="#8B6F47"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="#8B6F47"
                  style={{ fontSize: '12px' }}
                  label={{ 
                    value: t.pricePerKg, 
                    angle: -90, 
                    position: 'insideLeft',
                    style: { fill: '#2D5016' }
                  }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff',
                    border: '2px solid #2D5016',
                    borderRadius: '8px'
                  }}
                />
                <Bar 
                  dataKey="price" 
                  fill="#2D5016"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      )}

      {/* SELL PRODUCE VIEW */}
      {mainView === 'sell' && (
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6 mb-6"
          >
            <h2 className="text-2xl font-bold text-[#2D5016] flex items-center gap-2 mb-6">
              <DollarSign className="w-7 h-7" />
              {t.listYourProduce}
            </h2>

            <form onSubmit={handleSellSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#2D5016] mb-2">
                    {t.productName}
                  </label>
                  <input
                    type="text"
                    value={sellForm.productName}
                    onChange={(e) => setSellForm({ ...sellForm, productName: e.target.value })}
                    required
                    placeholder={language === 'en' ? 'e.g., Fresh Maize' : 'mfano, Mahindi Safi'}
                    className="w-full px-4 py-3 border-2 border-[#8B6F47] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D5016]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#2D5016] mb-2">
                    {t.category}
                  </label>
                  <select
                    value={sellForm.category}
                    onChange={(e) => setSellForm({ ...sellForm, category: e.target.value as CategoryType })}
                    className="w-full px-4 py-3 border-2 border-[#8B6F47] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D5016]"
                  >
                    <option value="produce">{language === 'en' ? 'Farm Produce' : 'Mazao ya Shambani'}</option>
                    <option value="inputs">{language === 'en' ? 'Farm Inputs' : 'Pembejeo za Kilimo'}</option>
                    <option value="seedlings">{language === 'en' ? 'Seedlings' : 'Miche'}</option>
                    <option value="equipment">{language === 'en' ? 'Equipment' : 'Vifaa'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#2D5016] mb-2">
                    {t.quantity}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={sellForm.quantity}
                      onChange={(e) => setSellForm({ ...sellForm, quantity: e.target.value })}
                      required
                      placeholder="100"
                      className="flex-1 px-4 py-3 border-2 border-[#8B6F47] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D5016]"
                    />
                    <select
                      value={sellForm.unit}
                      onChange={(e) => setSellForm({ ...sellForm, unit: e.target.value })}
                      className="px-4 py-3 border-2 border-[#8B6F47] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D5016]"
                    >
                      <option value="kg">kg</option>
                      <option value="bags">{language === 'en' ? 'bags' : 'magunia'}</option>
                      <option value="pieces">{language === 'en' ? 'pieces' : 'vipande'}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#2D5016] mb-2">
                    {t.pricePerUnit} (KES)
                  </label>
                  <input
                    type="number"
                    value={sellForm.pricePerUnit}
                    onChange={(e) => setSellForm({ ...sellForm, pricePerUnit: e.target.value })}
                    required
                    placeholder="45"
                    className="w-full px-4 py-3 border-2 border-[#8B6F47] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D5016]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#2D5016] mb-2">
                    {t.yourLocation}
                  </label>
                  <input
                    type="text"
                    value={sellForm.location}
                    onChange={(e) => setSellForm({ ...sellForm, location: e.target.value })}
                    required
                    className="w-full px-4 py-3 border-2 border-[#8B6F47] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D5016]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#2D5016] mb-2">
                  {t.productDescription}
                </label>
                <textarea
                  value={sellForm.description}
                  onChange={(e) => setSellForm({ ...sellForm, description: e.target.value })}
                  required
                  rows={4}
                  placeholder={language === 'en' ? 'Describe your product quality, harvest date, etc.' : 'Eleza ubora wa bidhaa yako, tarehe ya mavuno, n.k.'}
                  className="w-full px-4 py-3 border-2 border-[#8B6F47] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D5016] resize-none"
                />
              </div>

              <div className="border-2 border-dashed border-[#8B6F47] rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 mb-2">{t.uploadPhotos}</p>
                <p className="text-sm text-gray-500">
                  {language === 'en' ? 'Drag and drop or click to upload' : 'Buruta na dondosha au bofya kupakia'}
                </p>
              </div>

              {sellSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border-2 border-green-500 rounded-lg p-4 flex items-center gap-3"
                >
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-green-800 font-semibold">{t.listedSuccess}</p>
                    <p className="text-green-700 text-sm">{t.viewInMarket}</p>
                  </div>
                </motion.div>
              )}

              <button
                type="submit"
                className="w-full px-6 py-4 bg-[#2D5016] text-white rounded-lg hover:bg-[#3D6B1F] transition-colors font-semibold flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                {t.listProduct}
              </button>
            </form>
          </motion.div>

          {/* Active Listings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-xl font-bold text-[#2D5016] mb-4">{t.yourListings}</h3>
            
            <div className="space-y-3">
              {/* Mock listing */}
              <div className="border-2 border-[#8B6F47] rounded-lg p-4 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-[#2D5016]">Fresh Maize - Grade A</h4>
                  <p className="text-sm text-gray-600">200 kg @ KES 45/kg</p>
                  <p className="text-xs text-gray-500 mt-1">Listed 2 days ago · 12 views</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-sm text-[#2D5016] border border-[#2D5016] rounded-lg hover:bg-[#F5F1E8]">
                    {t.edit}
                  </button>
                  <button className="px-3 py-1 text-sm text-red-600 border border-red-600 rounded-lg hover:bg-red-50">
                    {t.remove}
                  </button>
                </div>
              </div>

              <div className="text-center py-8 text-gray-500">
                <Store className="w-12 h-12 mx-auto mb-2 opacity-30" />
                <p className="text-sm">{language === 'en' ? 'List your produce to reach more buyers' : 'Orodhesha mazao yako kufikia wanunuzi zaidi'}</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}