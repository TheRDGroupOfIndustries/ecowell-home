// interface Variant {
//     id: string;
//     name: string;
//     isSelected: boolean;
//     onClick: () => void;
//   }
  
//   interface VariantGroupProps {
//     title: string;
//     variants: Variant[];
//   }
  
  export function VariantGroup({ title, variants }) {
    return (
      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">{title}</h3>
        <div className="flex gap-2">
          {variants.map((variant) => (
            <button
              key={variant.id}
              onClick={variant.onClick}
              className={`px-4 py-2 rounded-md border ${
                variant.isSelected
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {variant.name}
            </button>
          ))}
        </div>
      </div>
    );
  }