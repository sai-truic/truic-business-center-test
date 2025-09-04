import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Select, SelectItem } from './ui/select';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from './ui/alert';
import { DatePicker } from './ui/date-picker';

const SalesTaxCalculator = () => {
  const [price, setPrice] = useState('');
  const [taxRate, setTaxRate] = useState('');
  const [result, setResult] = useState(null);
  const [location, setLocation] = useState('');
  const [locationType, setLocationType] = useState('zip');
  const [transactionDate, setTransactionDate] = useState(new Date());
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const calculateTax = () => {
    setError('');
    const priceValue = parseFloat(price);
    const taxRateValue = parseFloat(taxRate);

    if (isNaN(priceValue) || isNaN(taxRateValue)) {
      setError('Please enter valid numbers for price and tax rate.');
      return;
    }

    const taxAmount = priceValue * (taxRateValue / 100);
    const totalPrice = priceValue + taxAmount;

    setResult({
      taxAmount: taxAmount.toFixed(2),
      totalPrice: totalPrice.toFixed(2),
    });
  };

  return (
    <Card className="w-full max-w-9xl mx-auto shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-lg">
        <CardTitle className="text-2xl font-bold text-center">Sales Tax Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        <div className="space-y-2">
          <Label htmlFor="price">Price ($)</Label>
          <Input
            id="price"
            type="number"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="locationType">Location Type</Label>
          <Select
            id="locationType"
            value={locationType}
            onValueChange={setLocationType}
            required
            placeholder="Select location type"
            isOpen={isOpen}
            onOpenChange={setIsOpen}
          >
            <SelectItem value="zip">ZIP Code</SelectItem>
            <SelectItem value="city">City</SelectItem>
            <SelectItem value="state">State</SelectItem>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            type="text"
            placeholder={`Enter ${locationType}`}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="taxRate">Tax Rate (%)</Label>
          <Input
            id="taxRate"
            type="number"
            placeholder="Enter tax rate"
            value={taxRate}
            onChange={(e) => setTaxRate(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="transactionDate">Transaction Date</Label>
          <DatePicker
            id="transactionDate"
            selected={transactionDate}
            onSelect={setTransactionDate}
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-center p-6">
        <Button onClick={calculateTax} className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded hover:from-blue-600 hover:to-purple-600 transition duration-300">Calculate</Button>
        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {result && (
          <div className="mt-4 text-center w-full">
            <Separator className="my-4" />
            <p className="font-semibold">Results:</p>
            <p>Tax Amount: ${result.taxAmount}</p>
            <p className="text-lg font-bold text-green-600">Total Price: ${result.totalPrice}</p>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default SalesTaxCalculator;
