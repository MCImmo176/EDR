import React, { useState } from 'react';
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
} from './command';
import * as countryFlags from 'country-flag-icons/react/3x2';

interface Country {
  name: string;
  code: string;
  dial_code: string;
}

interface ComboboxCountryProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  countryCodes: Country[];
}

function FlagIcon({ code }: { code: string }) {
  if (!code || code.length !== 2) return null;
  
  const countryCode = code.toUpperCase();
  // @ts-ignore - Les types du package ne sont pas à jour
  const Flag = countryFlags[countryCode];
  
  return Flag ? (
    <Flag 
      title={countryCode}
      className="inline-block"
      style={{ 
        width: 24, 
        height: 16, 
        borderRadius: 2,
        verticalAlign: 'middle'
      }}
    />
  ) : null;
}

export const ComboboxCountry: React.FC<ComboboxCountryProps> = ({ value, onChange, label = 'Indicatif', countryCodes }) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const selected = countryCodes.find(c => c.dial_code === value);

  const filteredCountries = countryCodes.filter(country => 
    country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    country.dial_code.includes(searchQuery)
  );

  return (
    <div className="relative w-full" style={{ maxWidth: 260, minWidth: 220 }}>
      {label && <label className="block mb-1 text-sm font-medium">{label}</label>}
      <button
        type="button"
        className="flex items-center w-full border rounded-md px-3 py-2 h-10 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring hover:bg-accent transition-colors"
        onClick={() => setOpen(!open)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {selected ? (
          <span className="inline-flex items-center gap-2">
            <FlagIcon code={selected.code} />
            <span>{selected.dial_code}</span>
            <span className="text-xs text-muted-foreground truncate max-w-[100px]">{selected.name}</span>
          </span>
        ) : (
          <span className="text-muted-foreground">Choisir un pays</span>
        )}
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full bg-popover border rounded-md shadow-lg">
          <Command>
            <CommandInput 
              placeholder="Rechercher un pays..." 
              value={searchQuery}
              onValueChange={setSearchQuery}
              className="border-0"
            />
            <CommandList className="max-h-[300px] overflow-auto">
              <CommandEmpty>Aucun pays trouvé.</CommandEmpty>
              {filteredCountries.map((country) => (
                <CommandItem
                  key={country.code + country.dial_code}
                  value={country.name + ' ' + country.dial_code}
                  onSelect={() => {
                    onChange(country.dial_code);
                    setOpen(false);
                    setSearchQuery('');
                  }}
                  className="flex gap-2 items-center py-2 px-3 cursor-pointer hover:bg-accent"
                >
                  <FlagIcon code={country.code} />
                  <span className="font-medium min-w-[60px]">{country.dial_code}</span>
                  <span className="text-sm text-muted-foreground truncate">{country.name}</span>
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  );
};