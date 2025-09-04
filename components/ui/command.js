import React from 'react';
import { Dialog } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import useInputState from '../useInputState';

/*
This is how you can use the Command component:

 <Command
   id="mainCommand"
   commands={[
     { id: 'cmd1', name: 'Open Settings' },
     { id: 'cmd2', name: 'Create New Document' },
     { id: 'cmd3', name: 'Log Out' },
   ]}
   onSelect={(command) => console.log('Selected command:', command)}
 />
*/

export const Command = ({ id, commands, onSelect }) => {
  const { getState, updateState } = useInputState();
  
  const { isOpen = false, query = '' } = getState('command', id) || {};

  const filteredCommands = commands.filter((command) =>
    command.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (command) => {
    onSelect(command);
    updateState('command', id, { isOpen: false });
  };

  const toggleOpen = () => {
    updateState('command', id, { isOpen: !isOpen });
  };

  const handleQueryChange = (e) => {
    updateState('command', id, { query: e.target.value });
  };

  return (
    <>
      <button
        onClick={toggleOpen}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <MagnifyingGlassIcon className="mr-2 h-5 w-5" />
        Open Command Palette
      </button>

      <Dialog open={isOpen} onClose={toggleOpen} className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          <div className="relative bg-white rounded-lg max-w-lg w-full mx-auto">
            <input
              type="text"
              className="w-full p-4 text-lg"
              placeholder="Type a command or search..."
              value={query}
              onChange={handleQueryChange}
            />

            <ul className="max-h-96 overflow-auto">
              {filteredCommands.map((command) => (
                <li
                  key={command.id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelect(command)}
                >
                  {command.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Dialog>
    </>
  );
};
