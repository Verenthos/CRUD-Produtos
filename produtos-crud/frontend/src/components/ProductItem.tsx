import { Product } from '../types/product';
// Importação dos ícones do Heroicons para edição e exclusão
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

// Interface que define as props do componente
interface ProductItemProps {
  product: Product;                    // Dados do produto
  onEdit: (product: Product) => void;  // Função chamada ao clicar em editar
  onDelete: (id: number) => void;      // Função chamada ao clicar em excluir
}

export function ProductItem({ product, onEdit, onDelete }: ProductItemProps) {
  return (
    // Linha da tabela (tr) contendo os dados do produto
    <tr>
      {/* Coluna Nome do Produto */}
      <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
      
      {/* Coluna Quantidade */}
      <td className="px-6 py-4 whitespace-nowrap">{product.quantity}</td>
      
      {/* Coluna Preço - formatado em moeda brasileira (R$) */}
      <td className="px-6 py-4 whitespace-nowrap">
        {new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(product.price)}
      </td>

      {/* Coluna de Ações (Editar e Excluir) */}
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        {/* Botão de Editar com ícone */}
        <button
          title="Editar produto"
          onClick={() => onEdit(product)}
          className="text-indigo-600 hover:text-indigo-900 mr-4"
        >
          <PencilIcon className="h-5 w-5" />
        </button>

        {/* Botão de Excluir com ícone */}
        <button
          title="Excluir produto"
          onClick={() => onDelete(product.id)}
          className="text-red-600 hover:text-red-900"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </td>
    </tr>
  );
}