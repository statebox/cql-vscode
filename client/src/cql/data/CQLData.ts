import { Schema } from './Schema';
import { Typeside } from './Typeside';
import { Instance } from './Instance';

export class CQLData{

	constructor(){
		
	}

	public getSchemas(): Schema[]{
		return [];
	}

	public getTypesides(): Typeside[]{
		return [];
	}

	public getInstances(): Instance[]{
		return [];
	}
}