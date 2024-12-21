import { useForm } from 'react-hook-form';
import { ProductInput } from '../types/product';

interface ProductFormProps {
  onSubmit: (data: ProductInput) => void;
  initialData?: ProductInput;
  buttonText?: string;
}

export function ProductForm({ onSubmit, initialData, buttonText = 'Salvar' }: ProductFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<ProductInput>({
    defaultValues: initialData
  });

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-grid">
          {/* Campo Nome */}
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Nome
            </label>
            <input
              type="text"
              id="name"
              className={`form-input ${errors.name ? 'border-red-500' : ''}`}
              {...register('name', { required: 'Nome é obrigatório' })}
            />
            {errors.name && (
              <span className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Campo Quantidade */}
          <div className="form-group">
            <label htmlFor="quantity" className="form-label">
              Quantidade
            </label>
            <input
              type="number"
              id="quantity"
              className={`form-input ${errors.quantity ? 'border-red-500' : ''}`}
              {...register('quantity', { 
                required: 'Quantidade é obrigatória',
                min: { value: 0, message: 'Quantidade deve ser maior que 0' }
              })}
            />
            {errors.quantity && (
              <span className="text-red-500 text-sm mt-1">
                {errors.quantity.message}
              </span>
            )}
          </div>

          {/* Campo Preço */}
          <div className="form-group">
            <label htmlFor="price" className="form-label">
              Preço
            </label>
            <input
              type="number"
              id="price"
              step="0.01"
              min="0.01"
              className={`form-input ${errors.price ? 'border-red-500' : ''}`}
              {...register('price', { 
                required: 'Preço é obrigatório',
                min: { value: 0.01, message: 'Preço deve ser maior que zero' },
                validate: {
                  positive: (value) => value > 0 || 'Preço deve ser maior que zero'
                }
              })}
              onKeyDown={(e) => {
                if (e.key === '-' || e.key === 'e') {
                  e.preventDefault();
                }
              }}
            />
            {errors.price && (
              <span className="text-red-500 text-sm mt-1">
                {errors.price.message}
              </span>
            )}
          </div>
        </div>

        <button type="submit" className="submit-button mt-4">
          {buttonText}
        </button>
      </form>
    </div>
  );
}