# UI Components Usage Guide

This document provides instructions on how to use the various UI components in our library.

## Table of Contents

- [UI Components Usage Guide](#ui-components-usage-guide)
  - [Table of Contents](#table-of-contents)
  - [Accordion](#accordion)
  - [Alert](#alert)
  - [AlertDialog](#alertdialog)
  - [AspectRatio](#aspectratio)
  - [Avatar](#avatar)
  - [Badge](#badge)
  - [Breadcrumb](#breadcrumb)
  - [Button](#button)
  - [Calendar](#calendar)
  - [Card](#card)
  - [Carousel](#carousel)
  - [Checkbox](#checkbox)
  - [Combobox](#combobox)
  - [ContextMenu](#contextmenu)
  - [DataTable](#datatable)
  - [DatePicker](#datepicker)
  - [Dialog](#dialog)
  - [Drawer](#drawer)
  - [DropdownMenu](#dropdownmenu)
  - [Form](#form)
  - [HoverCard](#hovercard)
  - [Input](#input)
  - [InputOTP](#inputotp)
  - [Label](#label)
  - [Menubar](#menubar)
  - [NavigationMenu](#navigationmenu)
  - [Pagination](#pagination)
  - [Popover](#popover)
  - [Progress](#progress)
  - [RadioGroup](#radiogroup)
  - [Resizable](#resizable)
  - [ScrollArea](#scrollarea)
  - [Select](#select)
  - [Separator](#separator)
  - [Sheet](#sheet)
  - [Skeleton](#skeleton)
  - [Slider](#slider)
  - [Sonner](#sonner)
  - [Switch](#switch)
  - [Table](#table)
  - [Tabs](#tabs)
  - [Textarea](#textarea)
  - [Toast](#toast)
  - [Toggle](#toggle)
  - [ToggleGroup](#togglegroup)
  - [Tooltip](#tooltip)

## Accordion

```jsx
<Accordion id="section1" title="Section 1">
  <p>Content for Section 1</p>
</Accordion>
<Accordion id="section2" title="Section 2">
  <p>Content for Section 2</p>
</Accordion>
```

## Alert

```jsx
<Alert
  id="successAlert"
  type="success"
  message="Operation completed successfully!"
  onClose={() => console.log('Alert closed')}
/>
<Alert
  id="errorAlert"
  type="error"
  message="An error occurred. Please try again."
  onClose={() => console.log('Alert closed')}
/>
```

## AlertDialog

```jsx
<AlertDialog
  id="confirmDelete"
  title="Confirm Deletion"
  description="Are you sure you want to delete this item? This action cannot be undone."
  confirmLabel="Delete"
  cancelLabel="Cancel"
  onConfirm={() => handleDelete()}
  onCancel={() => console.log('Deletion cancelled')}
/>
```

## AspectRatio

```jsx
<AspectRatio id="video-container" ratio={16/9}>
  <video src="example.mp4" />
</AspectRatio>

<AspectRatio id="image-container" ratio={4/3}>
  <img src="example.jpg" alt="Example" />
</AspectRatio>
```

## Avatar

```jsx
<Avatar id="user1" src="/path/to/image.jpg" alt="User 1" size="md" />
<Avatar id="user2" src="/path/to/another-image.jpg" alt="User 2" size="lg" />
```

## Badge

```jsx
<Badge id="status" variant="success">Active</Badge>
<Badge id="priority" variant="danger">High</Badge>
<Badge id="category" variant="primary">Feature</Badge>
```

## Breadcrumb

```jsx
<Breadcrumb id="mainNav">
  <BreadcrumbItem href="/" id="home">Home</BreadcrumbItem>
  <BreadcrumbItem href="/products" id="products">Products</BreadcrumbItem>
  <BreadcrumbItem href="/products/electronics" id="electronics" isCurrent>Electronics</BreadcrumbItem>
</Breadcrumb>
```

## Button

```jsx
<Button id="submit" variant="primary">Submit</Button>
<Button id="cancel" variant="secondary" disabled>Cancel</Button>
<Button id="delete" variant="danger" onClick={() => handleDelete()}>Delete</Button>
```

## Calendar

```jsx
<Calendar
  id="appointmentDate"
  onSelect={(date) => console.log('Selected date:', date)}
/>
```

## Card

```jsx
<Card id="userCard" data={{ name: "John Doe", email: "john@example.com" }}>
  <CardHeader>
    <CardTitle>User Profile</CardTitle>
    <CardDescription>View and edit user details</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Name: {cardData?.name}</p>
    <p>Email: {cardData?.email}</p>
  </CardContent>
  <CardFooter>
    <button onClick={() => updateCard({ name: "Jane Doe" })}>
      Update Name
    </button>
  </CardFooter>
</Card>
```

## Carousel

```jsx
<Carousel id="myCarousel" items={[
  { id: 1, content: <img src="/image1.jpg" alt="Image 1" /> },
  { id: 2, content: <img src="/image2.jpg" alt="Image 2" /> },
  { id: 3, content: <img src="/image3.jpg" alt="Image 3" /> }
]}>
  {(item) => (
    <CarouselItem key={item.id}>
      {item.content}
    </CarouselItem>
  )}
</Carousel>
```

## Checkbox

```jsx
<Checkbox id="terms" label="I agree to the terms and conditions" />
<Checkbox id="newsletter" label="Subscribe to our newsletter" />
```

## Combobox

```jsx
<Combobox
  id="myCombobox"
  options={[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ]}
  placeholder="Select an option"
  onSelect={(option) => console.log('Selected:', option)}
/>
```

## ContextMenu

```jsx
<ContextMenu
  id="myContextMenu"
  items={[
    { label: 'Option 1', onClick: () => console.log('Option 1 clicked') },
    { label: 'Option 2', onClick: () => console.log('Option 2 clicked') },
  ]}
>
  <div>Right-click me to open the context menu</div>
</ContextMenu>
```

## DataTable

```jsx
<DataTable
  id="userTable"
  columns={[
    { header: 'Name', accessor: (row) => row.name },
    { header: 'Email', accessor: (row) => row.email },
    { header: 'Role', accessor: (row) => row.role },
  ]}
  data={[
    { name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  ]}
/>
```

## DatePicker

```jsx
<DatePicker
  id="appointmentDate"
  onSelect={(date) => console.log('Selected date:', date)}
  placeholder="Select appointment date"
/>
```

## Dialog

```jsx
<Dialog id="myDialog">
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
    </DialogHeader>
    <p>Dialog content goes here.</p>
    <DialogFooter>
      <Button id="closeDialog" onClick={() => updateState('dialog', 'myDialog', { isOpen: false })}>Close</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

## Drawer

```jsx
<Drawer
  id="settingsDrawer"
  side="right"
>
  <h2>Settings</h2>
  <p>Drawer content goes here.</p>
</Drawer>
```

## DropdownMenu

```jsx
<DropdownMenu
  id="userMenu"
  trigger="User Menu"
  items={[
    { label: 'Profile', href: '/profile', onClick: () => console.log('Profile clicked') },
    { label: 'Settings', href: '/settings', onClick: () => console.log('Settings clicked') },
    { label: 'Logout', href: '/logout', onClick: () => console.log('Logout clicked') },
  ]}
/>
```

## Form

```jsx
<Form id="registrationForm" onSubmit={handleSubmit}>
  <FormField id="username" label="Username">
    <Input id="username" name="username" placeholder="Enter username" required />
  </FormField>
  <FormField id="email" label="Email">
    <Input id="email" name="email" type="email" placeholder="Enter email" required />
  </FormField>
  <FormMessage id="formError" type="error">Please fill in all required fields.</FormMessage>
  <Button id="submitButton" type="submit">Register</Button>
</Form>
```

## HoverCard

```jsx
<HoverCard
  id="userHoverCard"
  trigger={<button>Hover me</button>}
  content={<div>User details here</div>}
/>
```

## Input

```jsx
<Input id="username" name="username" placeholder="Enter username" required />
<Input id="email" name="email" placeholder="Enter email" required />
```

## InputOTP

```jsx
<InputOTP
  id="verificationCode"
  length={6}
  onComplete={(code) => console.log('Completed OTP:', code)}
/>
```

## Label

```jsx
<Label id="usernameLabel" htmlFor="username">Username</Label>
<Label id="emailLabel" htmlFor="email">Email Address</Label>
```

## Menubar

```jsx
<Menubar
  id="mainMenu"
  items={[
    {
      label: 'File',
      submenu: [
        { label: 'New', onClick: () => console.log('New clicked') },
        { label: 'Open', onClick: () => console.log('Open clicked') },
        { label: 'Save', onClick: () => console.log('Save clicked') },
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { label: 'Undo', onClick: () => console.log('Undo clicked') },
        { label: 'Redo', onClick: () => console.log('Redo clicked') },
        { label: 'Cut', onClick: () => console.log('Cut clicked') },
      ]
    },
  ]}
/>
```

## NavigationMenu

```jsx
<NavigationMenu
  id="mainNav"
  items={[
    { label: 'Home', content: <a href="/">Home</a> },
    { label: 'Products', content: (
      <>
        <a href="/products/category1">Category 1</a>
        <a href="/products/category2">Category 2</a>
      </>
    )},
    { label: 'About', content: <a href="/about">About Us</a> },
  ]}
/>
```

## Pagination

```jsx
<Pagination
  id="userListPagination"
  totalPages={10}
  onPageChange={(page) => console.log('Page changed to:', page)}
/>
```

## Popover

```jsx
<Popover
  id="userPopover"
  trigger={<button>Click me</button>}
  content={<div>Popover content here</div>}
/>
```

## Progress

```jsx
<Progress id="downloadProgress" value={50} max={100} />
```

## RadioGroup

```jsx
<RadioGroup id="favoriteColor" name="favoriteColor">
  <RadioGroupItem value="red">Red</RadioGroupItem>
  <RadioGroupItem value="blue">Blue</RadioGroupItem>
  <RadioGroupItem value="green">Green</RadioGroupItem>
</RadioGroup>
```

## Resizable

```jsx
<Resizable id="sidebar" direction="horizontal" minSize={200} maxSize={500}>
  <div>Resizable content</div>
</Resizable>
```

## ScrollArea

```jsx
<ScrollArea id="myScrollArea" className="h-64">
  <div className="p-4">
    <p>Scrollable content goes here...</p>
  </div>
</ScrollArea>
```

## Select

```jsx
<Select id="favoriteColor">
  <SelectItem value="red">Red</SelectItem>
  <SelectItem value="blue">Blue</SelectItem>
  <SelectItem value="green">Green</SelectItem>
</Select>
```

## Separator

```jsx
<Separator id="section-divider" className="my-4" />
```

## Sheet

```jsx
<Sheet
  id="settingsSheet"
  side="right"
>
  <h2>Settings</h2>
  <p>Sheet content goes here.</p>
</Sheet>
```

## Skeleton

```jsx
<Skeleton id="loadingRect" className="w-64 h-32" />
<SkeletonText id="loadingText" lines={5} />
<SkeletonCircle id="loadingAvatar" size={16} />
```

## Slider

```jsx
<Slider
  id="volumeControl"
  min={0}
  max={100}
  step={1}
  defaultValue={50}
  onChange={(value) => console.log('New value:', value)}
/>
```

## Sonner

```jsx
<Sonner id="mainToaster" />

// To add a toast:
const { updateState } = useInputState();
updateState('sonner', 'mainToaster', {
  toasts: [
    ...existingToasts,
    { id: Date.now(), message: 'New toast message', type: 'info' }
  ]
});
```

## Switch

```jsx
<Switch id="darkMode" label="Dark Mode" />
```

## Table

```jsx
<Table id="userTable">
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>John Doe</TableCell>
      <TableCell>john@example.com</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Jane Smith</TableCell>
      <TableCell>jane@example.com</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

## Tabs

```jsx
<Tabs id="mainTabs">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content for Tab 1</TabsContent>
  <TabsContent value="tab2">Content for Tab 2</TabsContent>
</Tabs>
```

## Textarea

```jsx
<Textarea id="description" name="description" placeholder="Enter description" required rows={5} />
<Textarea id="comments" name="comments" placeholder="Enter comments" required />
```

## Toast

```jsx
<Toast id="successToast" message="Operation successful" type="success" duration={3000} />
```

## Toggle

```jsx
<Toggle id="darkMode" label="Dark Mode" />
```

## ToggleGroup

```jsx
<ToggleGroup id="viewMode">
  <ToggleGroupItem value="list">List View</ToggleGroupItem>
  <ToggleGroupItem value="grid">Grid View</ToggleGroupItem>
</ToggleGroup>
```

## Tooltip

```jsx
<Tooltip id="helpTip" content="This is a helpful tip">
  <button>Hover me</button>
</Tooltip>
```

## BusinessPlanGenerator

```jsx
import BusinessPlanGenerator from '../components/BusinessPlanGenerator';

<BusinessPlanGenerator />
```

The BusinessPlanGenerator component creates a wizard-style interface for generating a business plan. It includes three sections that users navigate through using "Next" and "Back" buttons:

1. Cover Page, Executive Summary, Company Description
   - Cover Page details: 
     - Company Name (text input)
     - Owner Name (text input)
     - Date Created (date picker)
     - Address (text input)
     - City (text input)
     - State (dropdown with US states)
     - Zip Code (text input)
     - Phone Number (text input)
     - Fax Number (text input)
     - Email Address (email input)
   - Executive Summary:
     - What product or service will your business provide? (textarea)
     - Who are your target customers? (textarea)
     - What goals do you have for your company? (textarea)
   - Company Description:
     - What is your mission statement? (textarea)
     - Who are the principle members of your company and what are their roles? (textarea)
     - What is the legal structure of your company? (textarea)
2. Market Research, Product Line, Marketing & Sales
   - Market Research:
     - Describe your industry (textarea)
     - Describe your customers (textarea)
     - Who are your competitors? (textarea)
     - What advantages do you have over your competition? (textarea)
     - What regulations apply to your company? (textarea)
   - Product Line:
     - What product or service will your company provide? (textarea)
     - Describe your pricing structure (textarea)
     - In which life cycle stage is your product or service? (textarea)
     - What intellectual property rights do you have for your product or service? (textarea)
     - What research and development (R&D) activities are you performing or planning? (textarea)
   - Marketing & Sales:
     - What is your plan to grow your company? (textarea)
     - How will you communicate with your customers? (textarea)
     - How will you sell your product or service? (textarea)
3. Financial Projections, Final Points
   - Financial Projections:
     - What are the assumptions for your profit and loss spreadsheet? (textarea)
     - Profit and Loss Projection (DataTable):
       - Columns: Year 1, Year 2, Year 3
       - Rows: Sales, Costs/Good Sold, Gross Profit, Operating Expenses, Salary (Office & Overhead), Payroll (taxes, etc.), Outside Services, Supplies (office & operation), Repairs & Maintenance, Advertising, Car & delivery & travel, Accounting & legal, Rent, Telephone, Utilities, Insurance, Taxes (real estate, etc.), Interest, Depreciation, Other expenses, Total Expenses, Net Profit (before taxes), Income Taxes, Net Profit (after taxes), Owner Draw/Dividends, Adjusted to Retained
   - Final Points (textarea)

Users can navigate between sections using tabs and input information into various form fields. The component uses a DatePicker for the "Date Created" field and a dropdown for the "State" field, providing a more user-friendly interface. The component handles form submission, which can be customized as needed.

The Cover Page section includes detailed fields for comprehensive business information, with improved input methods for date and state selection.

## SmallBusinessStartupCourse

```jsx
import SmallBusinessStartupCourse from '../components/SmallBusinessStartupCourse';

<SmallBusinessStartupCourse />
```

The SmallBusinessStartupCourse component displays a comprehensive course structure for starting a small business. It includes multiple chapters, each containing lessons and downloadable resources. The component uses an accordion-style layout for easy navigation.

Features:
- Expandable/collapsible chapters
- Links to individual lessons
- Downloadable resources for each chapter (where applicable)
- Responsive design for various screen sizes

The course structure includes:
1. Planning and Ideation
2. Business Formation
3. Back Office Setup
4. Branding
5. Building a Website (Coming Soon)
6. Lead Generation & Conversion (Coming Soon)
7. Social Media (Coming Soon)
8. Paid Advertising (Coming Soon)

Each chapter contains multiple lessons with links to the corresponding content. Some chapters also include downloadable resources relevant to the topic.

To use this component, simply import it and place it in your desired location within your React application. The component handles its own state and doesn't require any props.

## EntrepreneurshipQuiz

```jsx
import EntrepreneurshipQuiz from '../components/EntrepreneurshipQuiz';

<EntrepreneurshipQuiz />
```

The EntrepreneurshipQuiz component provides an interactive quiz to assess a user's readiness for entrepreneurship. It presents a series of questions and, based on the user's answers, provides insights and recommendations.

Features:
- Multiple-choice questions presented one at a time
- Automatic progression through questions
- Results page with overall assessment and detailed insights
- Accordion-style display of insights for easy reading

The quiz structure includes:
1. A series of questions about the user's financial situation, support system, industry knowledge, and personality traits
2. An outcome assessment based on the user's answers
3. Detailed insights into various aspects of entrepreneurship readiness

To use this component, import it and place it in your desired location within your React application. The component handles its own state and doesn't require any props.

Usage example:

```jsx
import React from 'react';
import EntrepreneurshipQuiz from '../components/EntrepreneurshipQuiz';

const QuizPage = () => {
  return (
    <div>
      <h1>Entrepreneurship Readiness Quiz</h1>
      <EntrepreneurshipQuiz />
    </div>
  );
};

export default QuizPage;
```

This will render the full quiz interface, allowing users to take the quiz and view their results.
