/* eslint-disable consistent-return */
/* eslint-disable default-case */
import { CollectionName, CompatibleFilter } from '../../types';

export type CommonFilter = { [k: string]: string | string[] | number };

const getCompatiblePropsValues = (
  collection: CollectionName,
  compatibleFilters: CompatibleFilter,
) => {
  let filter: CommonFilter = {};

  switch (collection) {
    case 'CPUs':
      if (compatibleFilters.motherboard) {
        filter = { ...filter, socket: compatibleFilters.motherboard.socket };
      }
      if (compatibleFilters.cooling) {
        filter = { ...filter, socket: compatibleFilters.cooling.socket };
      }

      if (compatibleFilters.motherboard) {
        filter = { ...filter, ramType: compatibleFilters.motherboard.ramType };
      }

      if (compatibleFilters.RAM) {
        filter = { ...filter, ramType: compatibleFilters.RAM.ramType };
      }
      return filter;

    case 'coolings':
      if (compatibleFilters.motherboard) {
        filter.socket = compatibleFilters.motherboard.socket;
      }

      if (compatibleFilters.CPU) {
        filter.socket = compatibleFilters.CPU.socket;
      }
      return filter;

    case 'motherboards':
      if (compatibleFilters.CPU) {
        filter = {
          ...filter,
          socket: compatibleFilters.CPU.socket,
          ramType: compatibleFilters.CPU.ramType,
        };
      }

      if (compatibleFilters.cooling) {
        filter = { ...filter, socket: compatibleFilters.cooling.socket };
      }

      if (compatibleFilters.RAM) {
        filter = { ...filter, ramType: compatibleFilters.RAM.ramType };
      }

      if (compatibleFilters.GPU) {
        filter = { ...filter, interface: compatibleFilters.GPU.interface };
      }

      if (compatibleFilters.case) {
        filter = { ...filter, formFactor: compatibleFilters.case.formFactor };
      }

      if (compatibleFilters.HDD) {
        filter = {
          ...filter,
          driveInterfaces: compatibleFilters.HDD.driveInterface,
        };
      }

      if (compatibleFilters.SSD) {
        filter = {
          ...filter,
          driveInterfaces: compatibleFilters.SSD.ssdInterface,
        };
      }
      return filter;

    case 'graphicsCards':
      if (compatibleFilters.motherboard) {
        filter = {
          ...filter,
          interface: compatibleFilters.motherboard.interface,
        };
      }

      if (compatibleFilters.PSU) {
        filter = {
          ...filter,
          power: compatibleFilters.PSU.power,
        };
      }
      return filter;

    case 'PSUs':
      if (compatibleFilters.case) {
        filter = {
          ...filter,
          psuFormFactor: compatibleFilters.case.psuFormFactor,
        };
      }

      if (compatibleFilters.GPU) {
        filter = {
          ...filter,
          power: compatibleFilters.GPU.power,
        };
      }
      return filter;
    case 'cases':
      if (compatibleFilters.motherboard) {
        filter = {
          ...filter,
          formFactor: compatibleFilters.motherboard.formFactor,
        };
      }

      if (compatibleFilters.PSU) {
        filter = {
          ...filter,
          psuFormFactor: compatibleFilters.PSU.psuFormFactor,
        };
      }
      return filter;

    case 'RAM':
      if (compatibleFilters.motherboard) {
        filter = { ...filter, ramType: compatibleFilters.motherboard.ramType };
      } else if (compatibleFilters.CPU) {
        filter = { ...filter, ramType: compatibleFilters.CPU.ramType };
      }
      return filter;

    case 'solidStateDrives':
      if (compatibleFilters.motherboard) {
        filter.ssdInterface = compatibleFilters.motherboard.driveInterfaces;
      }
      return filter;

    case 'hardDrives':
      if (compatibleFilters.motherboard) {
        filter.driveInterface = compatibleFilters.motherboard.driveInterfaces;
      }
      return filter;

    default:
      return filter;
  }
};

export default getCompatiblePropsValues;
