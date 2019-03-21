import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateMensajeDto } from '../../dto/create-mensaje-dto';
// Base de datos
import { Mensaje } from '../../entities/mensaje.entity';

@Injectable()
export class MensajesService {
	constructor(
		@InjectRepository(Mensaje)
		   // llamar un mensaje de tipo Repositorio para insertar datos
		   private readonly mensajeRepository: Repository<Mensaje>, 
		   ) {}

		// obtener todos
		async getAll():Promise<Mensaje[]> {
			return await this.mensajeRepository.find();
		}
		// insertar mensaje
		async createMensaje(mensajeNuevo: CreateMensajeDto):Promise<Mensaje> {
			const nuevo = new Mensaje();
			nuevo.mensaje = mensajeNuevo.mensaje;
			nuevo.nick = mensajeNuevo.nick;

			// invocar el repositorio
			return this.mensajeRepository.save(nuevo);
		}
		// Actualizar
		async updateMensaje(id: number, mensajeActualizar: CreateMensajeDto):Promise <Mensaje> {
			const mensajeUpdate = await this.mensajeRepository.findOne(id);

			mensajeUpdate.nick = mensajeActualizar.nick;
			mensajeUpdate.mensaje = mensajeActualizar.mensaje;

			return await this.mensajeRepository.save(mensajeUpdate);
		}
		// borrar
		async deleteMensaje(id: number): Promise<any> {
			return await this.mensajeRepository.delete(id);
		}



}
