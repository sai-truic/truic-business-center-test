import React, { useState } from 'react';
import { DataTable } from './DataTable';

export const ToggleableDataTable = ({ id, columns, data, onDataChange, stateValue, hasReloaded, setHasReloaded, handleInfoClick }) => {
  const [isEditable, setIsEditable] = useState(true);

  return (
    <div>
      <DataTable
        id={id}
        columns={columns}
        data={data}
        isEditable={true}
        onDataChange={onDataChange}
        stateValue={stateValue}
        hasReloaded={hasReloaded}
        setHasReloaded={setHasReloaded}
        handleInfoClick={handleInfoClick}
      />
    </div>
  );
};

export default ToggleableDataTable;
