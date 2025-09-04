import { useCallback } from 'react';
import { useS3 } from './useS3';
import { useMongodb } from './useMongodb';
import { useSqlDatabase } from './useSqlDatabase';
import { useCache } from './useCache';
import { useCosmosDB } from './useCosmosDB';

/*
  To access the data store within a component, use the useDataStore hook with the desired store type.
  Example:

  import { useDataStore } from './hooks/useDataStore';                                                                                                 
                                                                                                                                                      
 const MyComponent = () => {                                                                                                                          
   const s3Store = useDataStore('s3');                                                                                                                
   const mongoStore = useDataStore('mongodb');                                                                                                        
   const sqlStore = useDataStore('sql', { dbType: 'postgres', connection: postgresConnection });                                                        
   const sqlStore = useDataStore('sql', { dbType: 'mysql', connection: mysqlConnection });                                                              
   const sqlStore = useDataStore('sql', { dbType: 'sqlite', connection: sqliteConnection });                                                            
   const cacheStore = useDataStore('cache');                                                                                                          
   const cosmosStore = useDataStore('cosmosdb');
                                                                                                                                                      
   This is how you can fetch the data:                                                                                                                                      
   const { data: s3Data, isLoading: s3Loading } = s3Store.fetch('myBucket', { objectKey: 'myObject' });                                               
   const { data: mongoData, isLoading: mongoLoading } = mongoStore.fetch('myCollection', { pipeline: [...] });                                        
   const { data, isLoading } = sqlStore.fetch('users', { query: 'SELECT * FROM users' });                                                                                                                                                             
   const { data: cacheData, isLoading: cacheLoading } = cacheStore.fetch('myCacheKey');                                                               
   const { data: cosmosData, isLoading: cosmosLoading } = cosmosStore.fetch('OperatingAgreementTool', 'SELECT * FROM c');
                                                                                                                                                      
   This is how you can save data:                                                                                                                                       
   const handleSaveS3 = (data) => s3Store.save('myBucket', data, { objectKey: 'myObject' });                                                          
   const handleSaveMongo = (data) => mongoStore.save('myCollection', data, { pipeline: [...] });                                                      
   const handleSavePostgres = (data) => postgresStore.save('myTable', data);                                                                          
   const handleSaveCache = (data) => cacheStore.save('myCacheKey', data);                                                                             
   const handleSaveCosmos = (data) => cosmosStore.save('OperatingAgreementTool', data);
                                                                                                                                                      
   This is how you can invalidate data:                                                                                                                                 
   const handleInvalidateS3 = () => s3Store.invalidate('myBucket', { objectKey: 'myObject' });                                                        
   const handleInvalidateMongo = () => mongoStore.invalidate('myCollection');                                                                         
   const handleInvalidatePostgres = () => postgresStore.invalidate('myTable');                                                                        
   const handleInvalidateCache = () => cacheStore.invalidate('myCacheKey');                                                                           
   const handleInvalidateCosmos = () => cosmosStore.invalidate('OperatingAgreementTool');
                                                                                                                                                      
   This is how you can list S3 objects:                                                                                                                                 
   const { data: s3Objects, isLoading: s3ListLoading } = s3Store.list({ bucketName: 'myBucket', prefix: 'myPrefix' });                                
                                                                                                                                                      
   // ... rest of your component                                                                                                                      
 }; 

 Great question! Different types of data storage have various use cases depending on the nature of your data and application requirements. Here are    
some common use cases for each type of data store in the useDataStore hook:                                                                           

 1 S3 (Object Storage):                                                                                                                               
    • Storing and serving large files (images, videos, documents)                                                                                     
    • Backup and archival of data                                                                                                                     
    • Static website hosting                                                                                                                          
    • Data lakes for big data analytics                                                                                                               
    • Storing application assets (e.g., user uploads)                                                                                                 
   Example: const s3Store = useDataStore('s3');                                                                                                       
 2 MongoDB (Document Database):                                                                                                                       
    • Storing semi-structured or unstructured data                                                                                                    
    • Content management systems                                                                                                                      
    • Real-time analytics                                                                                                                             
    • Catalog or product information                                                                                                                  
    • User profiles and preferences                                                                                                                   
    • Event logging                                                                                                                                   
   Example: const mongoStore = useDataStore('mongodb');                                                                                               
 3 SQL (Relational Database - PostgreSQL, MySQL, SQLite):                                                                                             
    • Structured data with complex relationships                                                                                                      
    • Financial transactions                                                                                                                          
    • E-commerce systems (orders, inventory)                                                                                                          
    • User authentication and authorization                                                                                                           
    • Business logic with ACID compliance                                                                                                             
    • Reporting and data analysis                                                                                                                     
   Example: const sqlStore = useDataStore('sql', { dbType: 'postgres', connection: postgresConnection });                                             
 4 Cache:                                                                                                                                             
    • Temporary data storage for fast retrieval                                                                                                       
    • Session management                                                                                                                              
    • Frequently accessed, read-heavy data                                                                                                            
    • API response caching                                                                                                                            
    • Real-time leaderboards or counters                                                                                                              
   Example: const cacheStore = useDataStore('cache');                                                                                                 
 5 Cosmos DB:
    • Globally distributed applications
    • IoT and telematics
    • Retail and marketing
    • Gaming
    • Web and mobile applications
    • Real-time personalization
   Example: const cosmosStore = useDataStore('cosmosdb');

Here are some specific examples of how you might use each store:                                                                                      

 1 S3:                                                                                                                                                
                                                                                                                                                      
    const s3Store = useDataStore('s3');                                                                                                               
    // Fetch a user's profile picture                                                                                                                 
    const { data: profilePic } = s3Store.fetch('user-uploads', { objectKey: 'user123/profile.jpg' });                                                 
    // Save a new document                                                                                                                            
    s3Store.save('documents', newDocumentData, { objectKey: 'reports/2023/q2-report.pdf' });                                                          
                                                                                                                                                      
 2 MongoDB:                                                                                                                                           
                                                                                                                                                      
    const mongoStore = useDataStore('mongodb');                                                                                                       
    // Fetch user preferences                                                                                                                         
    const { data: userPrefs } = mongoStore.fetch('users', { pipeline: [{ $match: { userId: '123' } }] });                                             
    // Save a new blog post                                                                                                                           
    mongoStore.save('blogPosts', newPostData);                                                                                                        
                                                                                                                                                      
 3 SQL:                                                                                                                                               
                                                                                                                                                      
    const sqlStore = useDataStore('sql', { dbType: 'postgres', connection: postgresConnection });                                                     
    // Fetch order details                                                                                                                            
    const { data: orderDetails } = sqlStore.fetch('orders', {                                                                                         
      query: 'SELECT * FROM orders WHERE id = $1',                                                                                                    
      params: [orderId]                                                                                                                               
    });                                                                                                                                               
    // Update product inventory                                                                                                                       
    sqlStore.save('inventory', updatedInventory, {                                                                                                    
      query: 'UPDATE inventory SET stock = $1 WHERE product_id = $2'                                                                                  
    });                                                                                                                                               
                                                                                                                                                      
 4 Cache:                                                                                                                                             
                                                                                                                                                      
    const cacheStore = useDataStore('cache');                                                                                                         
    // Fetch cached user session                                                                                                                      
    const { data: userSession } = cacheStore.fetch('session:user123');                                                                                
    // Cache API response                                                                                                                             
    cacheStore.save('api:products', productListData);                                                                                                 

 5 Cosmos DB:

    const cosmosStore = useDataStore('cosmosdb');
    // Fetch user data
    const { data: userData } = cosmosStore.fetch('OperatingAgreementTool', 'SELECT * FROM c WHERE c.userId = @userId');
    // Save new user data
    cosmosStore.save('OperatingAgreementTool', newUserData);

By using the useDataStore hook, you can easily switch between these different data stores while maintaining a consistent interface in your            
application. This allows for flexibility in choosing the right storage solution for each type of data you're working with.  
*/



export const useDataStore = (storeType, options = {}) => {
  const s3 = useS3();
  const mongodb = useMongodb();
  const sqlDatabase = useSqlDatabase(options.dbType, options.connection);
  const cache = useCache();
  const cosmosDB = useCosmosDB();

  const getStore = useCallback(() => {
    switch (storeType) {
      case 's3':
        return s3;
      case 'mongodb':
        return mongodb;
      case 'sql':
        return sqlDatabase;
      case 'cache':
        return cache;
      case 'cosmosdb':
        return cosmosDB;
      default:
        throw new Error(`Unsupported store type: ${storeType}`);
    }
  }, [storeType, s3, mongodb, sqlDatabase, cache, cosmosDB]);
                                                                                                                                                     
  const fetch = useCallback((key, options = {}) => {
    const store = getStore();
    switch (storeType) {
      case 's3':
        return store.fetchFromStorage(key, options.objectKey);
      case 'mongodb':
        return store.fetchFromDatabase(key, options.pipeline);
      case 'sql':
        return store.fetchFromSql(key, options.query, options.params);
      case 'cache':
        return store.fetchFromCache(key);
      case 'cosmosdb':
        return store.fetchFromDatabase(key, options.query);
      default:
        throw new Error(`Unsupported store type: ${storeType}`);
    }
  }, [getStore, storeType]);
                                                                                                                                                     
  const save = useCallback((key, data, options = {}) => {
    const store = getStore();
    switch (storeType) {
      case 's3':
        return store.setToStorage(key, options.objectKey).saveToStorage(data);
      case 'mongodb':
        return store.setToDatabase(key).saveToDatabase(data, options.pipeline);
      case 'sql':
        return store.setToSql(key, options.query).saveToSql(data);
      case 'cache':
        return store.setToCache(key).saveToCache(data);
      case 'cosmosdb':
        return store.save(key, data);
      default:
        throw new Error(`Unsupported store type: ${storeType}`);
    }
  }, [getStore, storeType]);
                                                                                                                                                     
  const invalidate = useCallback((key, options = {}) => {
    const store = getStore();
    switch (storeType) {
      case 's3':
        return store.invalidateStorage(key, options.objectKey);
      case 'mongodb':
      case 'sql':
      case 'cosmosdb':
        return store.invalidateDatabase(key);
      case 'cache':
        return store.invalidateCache(key);
      default:
        throw new Error(`Unsupported store type: ${storeType}`);
    }
  }, [getStore, storeType]);
                                                                                                                                                     
  const list = useCallback((options = {}) => {                                                                                                       
    if (storeType === 's3') {                                                                                                                        
      return getStore().listObjects(options.bucketName, options.prefix);                                                                             
    }                                                                                                                                                
    throw new Error(`List operation not supported for ${storeType}`);                                                                                
  }, [getStore, storeType]);                                                                                                                         
                                                                                                                                                     
  return {                                                                                                                                           
    fetch,                                                                                                                                           
    save,                                                                                                                                            
    invalidate,                                                                                                                                      
    list,                                                                                                                                            
  };                                                                                                                                                 
};                                                                                                                                                   
                                                                                                                                                     
// Export individual hooks for backward compatibility and specific use cases
export { useS3 } from './useS3';
export { useMongodb } from './useMongodb';
export { useSqlDatabase } from './useSqlDatabase';
export { useCache } from './useCache';
export { useCosmosDB } from './useCosmosDB';