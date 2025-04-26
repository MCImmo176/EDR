import React, { useState } from 'react';
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
} from './command';
import 'country-flag-icons/react/3x2';

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

// Composant pour afficher le drapeau SVG depuis le dossier public
function FlagIcon({ code }: { code: string }) {
  if (!code || code.length !== 2) return null;
  return (
    <img
      src={`/flags/3x2/${code.toUpperCase()}.svg`}
      alt=""
      style={{ width: 24, height: 16, borderRadius: 2, objectFit: 'cover', display: 'inline-block' }}
      loading="lazy"
      onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
    />
  );
}

export const ComboboxCountry: React.FC<ComboboxCountryProps> = ({ value, onChange, label = 'Indicatif', countryCodes }) => {
  const [open, setOpen] = useState(false);
  const selected = countryCodes.find(c => c.dial_code === value);

  return (
    <div className="w-full" style={{ maxWidth: 260, minWidth: 220 }}>
      {label && <label className="block mb-1 text-sm font-medium">{label}</label>}
      <button
        type="button"
        className="flex items-center w-full border rounded-md px-3 py-2 h-10 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        style={{ width: '100%', maxWidth: 260, minWidth: 220 }}
      >
        {selected ? (
          <span className="inline-flex items-center gap-2">
            <FlagIcon code={selected.code} />
            <span>{selected.dial_code}</span>
            <span className="text-xs text-muted-foreground">{selected.name}</span>
          </span>
        ) : (
          <span className="text-muted-foreground">Choisir un pays</span>
        )}
        <span className="ml-auto">▾</span>
      </button>
      {open && (
        <div className="absolute z-50 mt-1 bg-popover border rounded-md shadow-lg" style={{ width: 260, minWidth: 220 }}>
          <Command shouldFilter={false}>
            <CommandInput placeholder="Rechercher un pays..." autoFocus />
            <CommandList>
              <CommandEmpty>Aucun pays trouvé.</CommandEmpty>
              {countryCodes.map((country) => (
                <CommandItem
                  key={country.code + country.dial_code}
                  value={country.name + ' ' + country.dial_code}
                  onSelect={() => {
                    onChange(country.dial_code);
                    setOpen(false);
                  }}
                  className="flex gap-2 items-center"
                >
                  <FlagIcon code={country.code} />
                  <span>{country.dial_code}</span>
                  <span className="text-xs text-muted-foreground">{country.name}</span>
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  );
}; 