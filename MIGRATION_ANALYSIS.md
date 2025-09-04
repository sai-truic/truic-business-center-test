# Next.js App Router Migration Analysis

## Current Structure Analysis

### Pages API Routes (to migrate to app/api):
1. `/pages/api/autocomplete.js` → `/app/api/autocomplete/route.js`
2. `/pages/api/clerk/delete-organization.js` → `/app/api/clerk/delete-organization/route.js`
3. `/pages/api/clerk/delete-user.js` → `/app/api/clerk/delete-user/route.js`
4. `/pages/api/clerk/get-org-members.js` → `/app/api/clerk/get-org-members/route.js`
5. `/pages/api/clerk/get-organizations.js` → `/app/api/clerk/get-organizations/route.js`
6. `/pages/api/clerk/remove-member.js` → `/app/api/clerk/remove-member/route.js`
7. `/pages/api/clerk/retrieve-organization.js` → `/app/api/clerk/retrieve-organization/route.js`
8. `/pages/api/clerk/retrieve-user.js` → `/app/api/clerk/retrieve-user/route.js`
9. `/pages/api/clerk/update-org-member-metadata.js` → `/app/api/clerk/update-org-member-metadata/route.js`
10. `/pages/api/clerk/update-organization.js` → `/app/api/clerk/update-organization/route.js`
11. `/pages/api/cosmosdb.js` → `/app/api/cosmosdb/route.js`
12. `/pages/api/database.js` → `/app/api/database/route.js`
13. `/pages/api/generate-bp-pdf.js` → `/app/api/generate-bp-pdf/route.js`
14. `/pages/api/generate-pdf.js` → `/app/api/generate-pdf/route.js`
15. `/pages/api/getCache.js` → `/app/api/cache/get/route.js`
16. `/pages/api/mongodb/mutate.js` → `/app/api/mongodb/mutate/route.js`
17. `/pages/api/mongodb/query.js` → `/app/api/mongodb/query/route.js`
18. `/pages/api/newsletter/signup.js` → `/app/api/newsletter/signup/route.js`
19. `/pages/api/printify/create-product.js` → `/app/api/printify/create-product/route.js`
20. `/pages/api/printify/get-products.js` → `/app/api/printify/get-products/route.js`
21. `/pages/api/printify/upload-image.js` → `/app/api/printify/upload-image/route.js`
22. `/pages/api/search.js` → `/app/api/search/route.js`
23. `/pages/api/setCache.js` → `/app/api/cache/set/route.js`

### Existing App Router API Routes (already migrated):
- `/app/api/bng/generate/route.js` ✅
- `/app/api/completion/route.js` ✅
- `/app/api/domain-availability/route.js` ✅
- `/app/api/utils/keywordExtractor.js` (utility, not route) ✅

### Files/Folders to Delete (unnecessary):
1. `/pages/` - entire folder after migration
2. `/__azurite_db_queue__.json` - Azure development artifact
3. `/__azurite_db_queue_extent__.json` - Azure development artifact
4. `/_pgbackup/` - PostgreSQL backup folder
5. `/_pginfo/` - PostgreSQL info folder
6. `/BalanceSheet.png` - large screenshot file
7. `/BreakEven.png` - large screenshot file
8. `/clipboard_image.png` - temporary image file
9. `/ui-dashboard.png` - large screenshot file
10. `/cypress/` - test folder (if not needed)
11. `/docs/` - documentation folder (can be kept or removed)
12. `/entrepreneurship_quiz.md` - standalone file not part of app
13. `/github_aider_integration.py` - development script
14. `/issue_5_context.txt` - development artifact
15. `/test-streaming.js` - test file
16. `/messages/` - unclear purpose folder
17. `/store/` - likely legacy state management
18. `/backend/` - contains only one hook file, can be moved

### Folders that need review:
1. `/api/` - root level, likely legacy
2. `/src/` - might contain useful utilities
3. `/tools/` - development tools
4. `/Utils/` - utility functions to potentially move to /lib
5. `/styles/` - CSS files to verify usage

### App Router Structure Target:
```
/app/
  layout.tsx ✅
  page.tsx ✅
  not-found.js ✅
  providers.tsx ✅
  sign-in/[[...sign-in]]/page.tsx ✅
  sign-up/[[...sign-up]]/page.tsx ✅
  terms-of-use/page.tsx ✅
  [id]/page.tsx ✅
  api/
    [all migrated routes]
```

## Migration Steps:
1. ✅ Analyze structure
2. Migrate all pages/api routes to app/api format
3. Delete pages folder
4. Clean up unnecessary files
5. Verify app router functionality
6. Create reference documentation