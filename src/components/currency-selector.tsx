"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppContext } from "@/context/app-provider";

const CurrencySelector = () => {
  const { state, dispatch } = useAppContext();

  const handleValueChange = (value: 'GBP' | 'EUR') => {
    dispatch({ type: 'SET_CURRENCY', payload: { currency: value } });
  };

  return (
    <Select onValueChange={handleValueChange} defaultValue={state.currency}>
      <SelectTrigger className="w-24 border-none !bg-transparent shadow-none focus:ring-0">
        <SelectValue placeholder="Currency" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="GBP">GBP (£)</SelectItem>
        <SelectItem value="EUR">EUR (€)</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default CurrencySelector;
