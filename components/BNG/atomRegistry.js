/**
 * Atom Registry for BNG state management
 * 
 * This keeps track of all atoms created to avoid duplicates
 * and ensures default values are properly maintained
 */

import { atom } from 'jotai';

export const atomRegistry = {};

/**
 * Creates a unique atom with the given key and default value
 * If an atom with the key already exists, returns the existing atom
 * 
 * @param {Object} options - Atom configuration options
 * @param {string} options.key - The unique key for this atom
 * @param {any} options.default - The default value for the atom
 * @returns {Object} - A Jotai atom
 */
export function createUniqueAtom(options) {
  const uniqueKey = `bng_${options.key}`;
  
  if (uniqueKey in atomRegistry) {
    return atomRegistry[uniqueKey];
  } else {
    const newAtom = atom(options.default);
    atomRegistry[uniqueKey] = {
      atom: newAtom,
      default: options.default
    };
    return newAtom;
  }
}