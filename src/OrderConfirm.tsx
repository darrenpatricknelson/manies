interface OrderConfirmProps {
  message: string;
  onPlaced: () => void;
  onReorder: () => void;
}

export function OrderConfirm({ message, onPlaced, onReorder }: OrderConfirmProps) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-confirm-title"
        className="relative w-full max-w-lg bg-[#141312] border border-orange-500 rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="bg-gradient-to-r from-orange-600 to-amber-500 px-6 py-3">
          <span className="font-bold text-xs uppercase tracking-wider text-white">Order Confirmation</span>
        </div>

        <div className="p-6 space-y-4">
          <h2 id="order-confirm-title" className="font-serif font-bold text-xl text-white">
            Thank you for Supporting Manies Pizza
          </h2>

          <div className="text-sm text-white">
            <p className="mb-3">Please confirm your order on WhatsApp.</p>
            <pre className="max-h-64 overflow-y-auto whitespace-pre-wrap font-sans text-sm text-white bg-stone-900 border border-stone-800 rounded-xl p-4">
              {message}
            </pre>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={onPlaced}
              className="bg-[#25d366] hover:bg-[#20ba5a] text-white font-extrabold text-sm uppercase tracking-wider py-3.5 rounded-xl shadow-lg transition-all cursor-pointer"
            >
              Order placed
            </button>
            <button
              type="button"
              onClick={onReorder}
              className="bg-red-600 hover:bg-red-500 text-white font-extrabold text-sm uppercase tracking-wider py-3.5 rounded-xl shadow-lg transition-all cursor-pointer"
            >
              Reorder
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
