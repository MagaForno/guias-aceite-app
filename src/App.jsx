import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const sedes = [
  "Panchita Miraflores", "Panchita San Borja", "Papachos Salaverry", "Lima Mundial",
  "Tanta To Go", "Astrid y Gastón", "Barra Chalaca Patio Panorama", "Barra Chalaca Santa Catalina",
  "Barra Chalaca San Isidro", "El Bodegon Miraflores", "El Bodegon Santa Catalina", "La Mar Miraflores",
  "Tanta Chacarilla", "Tanta El Polo", "Tanta Jockey Plaza", "Tanta Larcomar", "Tanta La Rambla",
  "Tanta Miraflores", "Tanta San Isidro", "Tanta Salaverry", "Tanta San Miguel", "Planta Kallpawasi",
  "Chicha Cuzco", "Chicha Arequipa", "Planta Arequipa"
];

export default function AceiteUsadoApp() {
  const [form, setForm] = useState({
    dia: '', mes: '', anio: '', proveedor: '', sede: '', numeroGuia: '', litros: '', precioLitro: '', total: ''
  });
  const [registros, setRegistros] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelect = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleAdd = () => {
    setRegistros([...registros, form]);
    setForm({ dia: '', mes: '', anio: '', proveedor: '', sede: '', numeroGuia: '', litros: '', precioLitro: '', total: '' });
  };

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(registros);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Guías de Aceite Usado");
    XLSX.writeFile(wb, "guias_aceite_usado.xlsx");
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Registro de Guías de Aceite Usado</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
        <input name="dia" placeholder="Día" value={form.dia} onChange={handleChange} />
        <input name="mes" placeholder="Mes" value={form.mes} onChange={handleChange} />
        <input name="anio" placeholder="Año" value={form.anio} onChange={handleChange} />
        <select value={form.proveedor} onChange={(e) => handleSelect('proveedor', e.target.value)}>
          <option value="">Proveedor</option>
          <option value="bioils">Bioils</option>
          <option value="otro">Otro</option>
        </select>
        <select value={form.sede} onChange={(e) => handleSelect('sede', e.target.value)}>
          <option value="">Sede</option>
          {sedes.map((sede, i) => <option key={i} value={sede}>{sede}</option>)}
        </select>
        <input name="numeroGuia" placeholder="Número de guía" value={form.numeroGuia} onChange={handleChange} />
        <input name="litros" placeholder="Litros" value={form.litros} onChange={handleChange} />
        <input name="precioLitro" placeholder="Precio por litro" value={form.precioLitro} onChange={handleChange} />
        <input name="total" placeholder="Total S/." value={form.total} onChange={handleChange} />
      </div>
      <div style={{ marginTop: '1rem' }}>
        <button onClick={handleAdd} style={{ marginRight: '1rem' }}>Agregar</button>
        <button onClick={handleExport}>Exportar a Excel</button>
      </div>
    </div>
  );
}