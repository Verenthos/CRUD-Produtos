import { useState } from 'react';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from 'react-query';
import { api } from './services/api';
import { Product, ProductInput } from './types/product';
import { ProductForm } from './components/ProductForm';
import { ProductList } from './components/ProductList';
import './styles/global.css'

const queryClient = new QueryClient();

function AppContent() {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const queryClient = useQueryClient();

  const { data: products = [], isLoading, error } = useQuery<Product[]>('products', async () => {
    const response = await api.get('/products');
    console.log('API Response:', response.data); // Debug log
    return response.data;
  });

  const createProduct = useMutation(async (product: ProductInput) => {
    const response = await api.post('/products', product);
    return response.data;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('products');
    }
  });

  const updateProduct = useMutation(async ({ id, ...data }: Product) => {
    const response = await api.put(`/products/${id}`, data);
    return response.data;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('products');
      setEditingProduct(null);
    }
  });

  const deleteProduct = useMutation(async (id: number) => {
    await api.delete(`/products/${id}`);
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('products');
    }
  });

  const handleSubmit = async (data: ProductInput) => {
    if (editingProduct) {
      await updateProduct.mutateAsync({ ...data, id: editingProduct.id });
    } else {
      await createProduct.mutateAsync(data);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4"> {/* Debug - fundo cinza */}
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6"> {/* Debug - container branco com sombra */}
        <h1 className="text-3xl font-bold text-blue-600 mb-6"> {/* Debug - texto azul */}
          {editingProduct ? 'Editar Produto' : 'Novo Produto'}
        </h1>
        
        <div className="bg-yellow-100 p-4 mb-6 rounded-lg"> {/* Debug - seção do formulário */}
          <ProductForm 
            onSubmit={handleSubmit}
            initialData={editingProduct || undefined}
            buttonText={editingProduct ? 'Atualizar' : 'Criar'}
          />
        </div>

        <div className="bg-green-100 p-4 rounded-lg"> {/* Debug - seção da lista */}
          {isLoading ? (
            <div className="text-center text-xl text-gray-600">Carregando...</div>
          ) : error ? (
            <div className="text-center text-xl text-red-600">Erro ao carregar produtos</div>
          ) : (
            <ProductList
              products={products}
              onEdit={setEditingProduct}
              onDelete={(id) => {
                if (window.confirm('Tem certeza que deseja excluir este produto?')) {
                  deleteProduct.mutateAsync(id);
                }
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-purple-100"> {/* Debug - container externo */}
        <AppContent />
      </div>
    </QueryClientProvider>
  );
}

export default App;