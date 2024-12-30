const ShowEntries = ({ value, onChange }) => (
  <div className="flex items-center text-light">
    <span className="mr-3 text-md">Show</span>
    <select
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="bg-darkBrand border border-gray-600 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-light text-md"
    >
      {[10, 20, 30, 40, 50].map((pageSize) => (
        <option key={pageSize} value={pageSize}>
          {pageSize}
        </option>
      ))}
    </select>
    <span className="ml-3 text-md">entries</span>
  </div>
);

export default ShowEntries;
