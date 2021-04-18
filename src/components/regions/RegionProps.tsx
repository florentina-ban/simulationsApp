import { OrderedSimpleCoordProps } from "./RegionComponent";

export default interface Region{
    name: string,
    population: number,
    boundaries: OrderedSimpleCoordProps[]
}