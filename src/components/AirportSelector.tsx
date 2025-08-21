import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Airport {
  code: string;
  city: string;
  country: string;
  name: string;
}

const airports: Airport[] = [
  // US Airports
  { code: "JFK", city: "New York", country: "USA", name: "John F. Kennedy International Airport" },
  { code: "LGA", city: "New York", country: "USA", name: "LaGuardia Airport" },
  { code: "EWR", city: "New York", country: "USA", name: "Newark Liberty International Airport" },
  { code: "LAX", city: "Los Angeles", country: "USA", name: "Los Angeles International Airport" },
  { code: "ORD", city: "Chicago", country: "USA", name: "O'Hare International Airport" },
  { code: "MDW", city: "Chicago", country: "USA", name: "Midway International Airport" },
  { code: "DFW", city: "Dallas", country: "USA", name: "Dallas/Fort Worth International Airport" },
  { code: "DEN", city: "Denver", country: "USA", name: "Denver International Airport" },
  { code: "ATL", city: "Atlanta", country: "USA", name: "Hartsfield-Jackson Atlanta International Airport" },
  { code: "MIA", city: "Miami", country: "USA", name: "Miami International Airport" },
  { code: "SFO", city: "San Francisco", country: "USA", name: "San Francisco International Airport" },
  { code: "SEA", city: "Seattle", country: "USA", name: "Seattle-Tacoma International Airport" },
  { code: "LAS", city: "Las Vegas", country: "USA", name: "McCarran International Airport" },
  { code: "PHX", city: "Phoenix", country: "USA", name: "Phoenix Sky Harbor International Airport" },
  { code: "BOS", city: "Boston", country: "USA", name: "Logan International Airport" },
  { code: "MSP", city: "Minneapolis", country: "USA", name: "Minneapolis-Saint Paul International Airport" },
  { code: "DTW", city: "Detroit", country: "USA", name: "Detroit Metropolitan Wayne County Airport" },
  { code: "PHL", city: "Philadelphia", country: "USA", name: "Philadelphia International Airport" },
  { code: "LGA", city: "New York", country: "USA", name: "LaGuardia Airport" },
  
  // Indian Airports
  { code: "DEL", city: "Delhi", country: "India", name: "Indira Gandhi International Airport" },
  { code: "BOM", city: "Mumbai", country: "India", name: "Chhatrapati Shivaji Maharaj International Airport" },
  { code: "BLR", city: "Bangalore", country: "India", name: "Kempegowda International Airport" },
  { code: "MAA", city: "Chennai", country: "India", name: "Chennai International Airport" },
  { code: "HYD", city: "Hyderabad", country: "India", name: "Rajiv Gandhi International Airport" },
  { code: "CCU", city: "Kolkata", country: "India", name: "Netaji Subhas Chandra Bose International Airport" },
  { code: "AMD", city: "Ahmedabad", country: "India", name: "Sardar Vallabhbhai Patel International Airport" },
  { code: "COK", city: "Kochi", country: "India", name: "Cochin International Airport" },
  { code: "GOI", city: "Goa", country: "India", name: "Goa Airport" },
  { code: "PNQ", city: "Pune", country: "India", name: "Pune Airport" },
  { code: "JAI", city: "Jaipur", country: "India", name: "Jaipur International Airport" },
  { code: "IXC", city: "Chandigarh", country: "India", name: "Chandigarh Airport" },
  { code: "TRV", city: "Thiruvananthapuram", country: "India", name: "Trivandrum International Airport" },
  { code: "VNS", city: "Varanasi", country: "India", name: "Lal Bahadur Shastri Airport" },
  { code: "PAT", city: "Patna", country: "India", name: "Jay Prakash Narayan Airport" },
  { code: "RPR", city: "Raipur", country: "India", name: "Swami Vivekananda Airport" },
  { code: "NAG", city: "Nagpur", country: "India", name: "Dr. Babasaheb Ambedkar International Airport" },
  { code: "IXB", city: "Bagdogra", country: "India", name: "Bagdogra Airport" },
  { code: "GAU", city: "Guwahati", country: "India", name: "Lokpriya Gopinath Bordoloi International Airport" },
  { code: "IMF", city: "Imphal", country: "India", name: "Imphal Airport" },
];

interface AirportSelectorProps {
  value?: string;
  onSelect: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const AirportSelector = ({ value, onSelect, placeholder = "Search for a city or airport...", disabled }: AirportSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const filteredAirports = useMemo(() => {
    if (!searchValue) return airports;
    
    const search = searchValue.toLowerCase();
    return airports.filter(airport => 
      airport.city.toLowerCase().includes(search) ||
      airport.code.toLowerCase().includes(search) ||
      airport.name.toLowerCase().includes(search) ||
      airport.country.toLowerCase().includes(search)
    );
  }, [searchValue]);

  const selectedAirport = airports.find(airport => airport.code === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          disabled={disabled}
        >
          {selectedAirport 
            ? `${selectedAirport.city} (${selectedAirport.code})`
            : placeholder
          }
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput 
            placeholder="Search airports..." 
            value={searchValue}
            onValueChange={setSearchValue}
          />
          <CommandList>
            <CommandEmpty>No airports found.</CommandEmpty>
            <CommandGroup>
              {filteredAirports.map((airport) => (
                <CommandItem
                  key={airport.code}
                  value={airport.code}
                  onSelect={(currentValue) => {
                    onSelect(currentValue === value ? "" : currentValue);
                    setOpen(false);
                    setSearchValue("");
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === airport.code ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="flex flex-col">
                    <span className="font-medium">
                      {airport.city} ({airport.code})
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {airport.name} - {airport.country}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};