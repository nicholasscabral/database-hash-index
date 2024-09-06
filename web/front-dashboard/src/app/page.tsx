'use client'

import { useState } from "react";

type ApiResponse = {
  items: string[];
  cost: number;
};

export default function Home() {
  const [pageSize, setPageSize] = useState<string>("");
  const [item, setItem] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [visibleItems, setVisibleItems] = useState<number>(10000);
  const [colissions, setColissions] = useState<number>(0);
  const [overflows, setOverflows] = useState<number>(0);

  const handleInit = async () => {
    if (!pageSize) {
      setMessage("Por favor informe o número de palavras por página.");
      return;
    }

    try {
      const response = await fetch(`/api/init/${pageSize}`, {
        method: "POST",
      })
      const data = await response.json();

      if (!response.ok) {
        setMessage("Erro ao criar as páginas.");
      } else {
        setColissions(data.colissions);
        setOverflows(data.overflows);
        setMessage("Páginas criadas com sucesso.");
      }
    } catch (error) {
      setMessage("Erro ao criar as páginas.");
    }
  };

  const handleTableScan = async () => {
    if (!item) {
      setMessage("Por favor informe a palavra.");
      return;
    }

    try {
      const res = await fetch(`/api/tablescan/${item}`);

      if (!res.ok) {
        setMessage("Erro ao executar o table scan.");
        setResponse(null);
      } else {
        const data: ApiResponse = await res.json();
        setResponse(data);
        setMessage(`Table scan completo.`);
        setVisibleItems(10000);
      }
    } catch (error) {
      setMessage("Erro ao executar table scan.");
      setResponse(null);
    }
  };

  const handleHashSearch = async () => {
    if (!item) {
      setMessage("Por favor informe a palavra.");
      return;
    }

    try {
      const res = await fetch(`/api/hashSearch/${item}`);

      if (!res.ok) {
        setMessage("Erro ao executar hash search.");
        setResponse(null);
      } else {
        const data: ApiResponse = await res.json();
        setResponse(data);
        setMessage(`Hash search completo.`);
      }
    } catch (error) {
      setMessage("Erro ao executar hash search.");
      setResponse(null);
    }
  };

  const showMoreItems = () => {
    if (response && visibleItems < response.items.length) {
      setVisibleItems((prev) => Math.min(prev + 10000, response.items.length));
    }
  };

  return (
    <div className="container mx-auto">
      <div className="bg-blue-500 pl-8 pt-4 flex align-middle">
        <h1 className="text-2xl text-white font-bold mb-4">Trabalho Ambiente de Dados</h1>
      </div>
      <div className="p-8">
        <div className="mb-6">
          <input
            type="number"
            value={pageSize}
            onChange={(e) => setPageSize(e.target.value)}
            placeholder="Page Size"
            className="border p-2 rounded mb-2 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] w-[2-vw]"
          />
          <br />
          <button
            onClick={handleInit}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Criar páginas
          </button>
        </div>

        {message && <p className="text-black mt-4">{message}</p>}

        {!!overflows && !!colissions && <p className="text-black my-4">Colisões: {colissions}, Overflows: {overflows}</p>}

        {!!overflows && !!colissions && (
          <div className="mb-6">
            <input
              type="text"
              value={item}
              onChange={(e) => setItem(e.target.value)}
              placeholder="Item"
              className="border p-2 rounded mb-2 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] w-[2-vw]"
            />
            <br />
            <button
              onClick={handleTableScan}
              className="bg-green-500 text-white py-2 px-4 rounded mr-2"
            >
              Table Scan
            </button>
            <button
              onClick={handleHashSearch}
              className="bg-red-500 text-white py-2 px-4 rounded"
            >
              Hash Search
            </button>
          </div>
        )}


        {response && (
          <div className="mt-6 rounded-lg p-2 w-[20vw] shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]">
            <h2 className="text-xl font-semibold">Resultado da busca:</h2>
            <p className="text-gray-700">Custo: {response.cost}</p>
            <ul className="list-disc pl-5">
              {response.items.slice(0, visibleItems).map((item, index) => (
                <li key={index} className="text-gray-700">
                  {item}
                </li>
              ))}
            </ul>
            {visibleItems < response.items.length && (
              <button
                onClick={showMoreItems}
                className="bg-gray-500 text-white py-2 px-4 rounded mt-4"
              >
                Exibir mais
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
