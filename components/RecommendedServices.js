import React, { useState, useEffect } from 'react';
import { Maximize2, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { services } from './RecommendedServiceComponents/services';
import { FeatureFilter } from './RecommendedServiceComponents/FeatureFilter';
import { ComparisonModal } from './RecommendedServiceComponents/ComparisonModal';
import { CategoryTags } from './RecommendedServiceComponents/CategoryTags';
import { SearchBar } from './RecommendedServiceComponents/SearchBar';
import { ServiceSection } from './RecommendedServiceComponents/ServiceSection';
import { getFeatures, filterServicesByFeatures } from './RecommendedServiceComponents/utils';
import { StarIcon } from '@heroicons/react/24/outline';

const RecommendedServices = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [comparedItems, setComparedItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [sortOption, setSortOption] = useState('rating');
  const [searchFilters, setSearchFilters] = useState(['title', 'description', 'features']);
  const [previousSearch, setPreviousSearch] = useState(null);

  const handleCompare = (id, category) => {
    setComparedItems(prev => {
      const exists = prev.some(i => i.id === id && i.category === category);
      if (exists) {
        return prev.filter(i => !(i.id === id && i.category === category));
      } else {
        const service = services.find(s => s.category === category);
        if (service) {
          const item = service.items.find(i => i.id === id);
          if (item) {
            return [...prev, { ...item, category }];
          }
        }
        return prev;
      }
    });
  };

  const handleFeatureToggle = (feature) => {
    setSelectedFeatures(prev => 
      prev.includes(feature) 
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  const handleSearchFilterChange = (filter) => {
    setSearchFilters(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const sortItems = (items) => {
    return [...items].sort((a, b) => {
      if (sortOption === 'rating') {
        return b.rating - a.rating;
      } else if (sortOption === 'name') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  };

  const filteredServices = filterServicesByFeatures(
    services.map(service => ({
      ...service,
      items: service.items.filter(item =>
        searchFilters.some(filter => {
          if (filter === 'title') {
            return item.title.toLowerCase().includes(searchTerm.toLowerCase());
          } else if (filter === 'description') {
            return item.description.toLowerCase().includes(searchTerm.toLowerCase());
          } else if (filter === 'features') {
            return item.features && Array.isArray(item.features) && item.features.some(feature => feature.toLowerCase().includes(searchTerm.toLowerCase()));
          }
          return false;
        })
      )
    })),
    selectedFeatures
  ).filter(service => 
    activeCategory === 'All' || service.category === activeCategory
  ).map(service => ({
    ...service,
    items: sortItems(service.items)
  }));

  // Sort services for "All" category
  if (activeCategory === 'All') {
    filteredServices.sort((a, b) => {
      if (sortOption === 'rating') {
        const aMaxRating = Math.max(...a.items.map(item => item.rating));
        const bMaxRating = Math.max(...b.items.map(item => item.rating));
        return bMaxRating - aMaxRating;
      } else if (sortOption === 'name') {
        return a.category.localeCompare(b.category);
      }
      return 0;
    });
  }

  const handleCategoryClick = (category, feature = null) => {
    setPreviousSearch({ activeCategory, selectedFeatures });
    setActiveCategory(category);
    if (feature) {
      setSelectedFeatures([feature]);
    } else {
      setSelectedFeatures([]);
    }
  };

  const handleBackToPreviousSearch = () => {
    if (previousSearch) {
      setSearchTerm(searchTerm);
      setActiveCategory(previousSearch.activeCategory);
      setPreviousSearch(null);
    }
  };

  const getCategoryTags = () => {
    if (!searchTerm || activeCategory !== 'All') return [];

    return filteredServices
      .filter(service => service.items.length > 0)
      .map(service => ({
        category: service.category,
        count: service.items.length,
        subFilters: Object.entries(getFeatures(service.category)).map(([feature, items]) => ({
          feature,
          count: items.filter(item => service.items.some(serviceItem => serviceItem.title === item)).length
        })).filter(subFilter => subFilter.count > 0)
      }));
  };

  const categoryTags = getCategoryTags();

  return (
    <div className="min-h-screen bg-white p-2 sm:p-4 md:p-6 lg:p-8">
      {/* Welcome section */}
      <div className="p-9 mb-8 text-black bg-gradient-to-r from-[#F59E0B] to-[#F27227] shadow-lg rounded-xl">
        <div className='flex flex-row align-middle mb-3'>
          <StarIcon className="inline me-3 text-white" width="40" height="40"></StarIcon>
          <h1 className="flex flex-row align-middle text-2xl md:text-3xl text-white">
            Recommended Services
          </h1>
        </div>
        <p className="text-xl font-semibold">
          Looking for the best LLC service in {new Date().getFullYear()} to start a business?
        </p>
        <p className='text-lg'>
         Formation companies can lower startup costs when forming an LLC online, and also offer affordable features such as an Employer Identification Number (EIN) and registered agent service.
        </p>
      </div>
      
      {/* Main Content Area */}
      <div className="main-content-panel-styling">
        <div className="absolute inset-0"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
        <div className="space-y-6 sm:space-y-8">
          <SearchBar 
            onSearch={setSearchTerm}
            categories={['All', ...services.map(s => s.category)]}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            sortOption={sortOption}
            onSortChange={setSortOption}
            searchFilters={searchFilters}
            onSearchFilterChange={handleSearchFilterChange}
          />

          {categoryTags.length > 0 && (
            <CategoryTags categories={categoryTags} onCategoryClick={handleCategoryClick} />
          )}

          {previousSearch && (
            <button
              onClick={handleBackToPreviousSearch}
              className="mb-4 flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to previous search
            </button>
          )}

          {(activeCategory === 'Banking' || activeCategory === 'Insurance' || activeCategory === 'Formation' || activeCategory === 'Press Release' || activeCategory === 'Business Phone' || 
  activeCategory === 'Business Loans' || activeCategory === 'Payroll') && (
            <FeatureFilter
              category={activeCategory}
              items={filteredServices.find(service => service.category === activeCategory)?.items || []}
              selectedFeatures={selectedFeatures}
              onFeatureToggle={handleFeatureToggle}
            />
          )}
      
          <div className="space-y-8">
            {searchTerm === '' && activeCategory === 'All'
              ? services.map((service, index) => (
                  <ServiceSection 
                    key={index}
                    category={service.category}
                    link={service.link} 
                    items={service.items}
                    icon={service.icon}
                    onCompare={handleCompare}
                    comparedItems={comparedItems}
                    isExpanded={false}
                    isAllCategory={true}
                    sortOption={sortOption}
                  />
                ))
              : filteredServices.map((service, index) => (
                  service.items.length > 0 && (
                    <ServiceSection 
                      key={index}
                      category={service.category} 
                      items={service.items} 
                      icon={service.icon}
                      onCompare={handleCompare}
                      comparedItems={comparedItems}
                      isExpanded={true}
                      isAllCategory={false}
                      sortOption={sortOption}
                    />
                  )
                ))
            }
          </div>
        </div>

        {comparedItems.length > 0 && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="fixed bottom-8 right-8 bg-[#C6500C] text-white p-4 rounded-full shadow-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 flex items-center"
          >
            <Maximize2 size={24} className="mr-2" />
            Compare ({comparedItems.length})
          </button>
        )}

        <ComparisonModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          items={comparedItems}
          onRemove={handleCompare}
        />
      </motion.div>
      </div>
    </div>
  );
};

export default RecommendedServices;
