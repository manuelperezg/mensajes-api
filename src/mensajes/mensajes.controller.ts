import { Controller, Post, Get, Put, Delete, Body, Res, HttpStatus, Param } from '@nestjs/common';
import { CreateMensajeDto } from './dto/create-mensaje-dto';
import { MensajesService } from './servicios/mensajes/mensajes.service';

@Controller('mensajes')
export class MensajesController {

	constructor(private mensajeService: MensajesService) {
	}

	@Post()
	create(@Body() createMensajeDto: CreateMensajeDto, @Res() response) {
		// conectar con el mensaje service
		this.mensajeService.createMensaje(createMensajeDto).then( mensaje => {
			response.status(HttpStatus.CREATED).json(mensaje);
		}).catch(() => {
			response.status(HttpStatus.FORBIDDEN).json({mensaje: 'Error en la creación del mensaje'});

		}); 
	}
	@Get()
	getAll(@Res() response) {
		this.mensajeService.getAll().then( mensaje => {
			response.status(HttpStatus.OK).json(mensaje);
		}).catch(() => {
			response.status(HttpStatus.FORBIDDEN).json({mensaje: 'Error al obtener los datos'});

		});

	}
	@Put(':id')
	update(@Body() updateMensajeDto: CreateMensajeDto, @Param('id') id, @Res() response) {
		this.mensajeService.updateMensaje(id, updateMensajeDto).then( mensaje => {
			response.status(HttpStatus.OK).json(mensaje);
		}).catch(() => {
			response.status(HttpStatus.FORBIDDEN).json({mensaje: 'Error al actualizar los datos'});

		});
	}
	@Delete(':id')
	delete(@Param('id') id, @Res() response) {
		this.mensajeService.deleteMensaje(id).then(mensaje => {
			response.status(HttpStatus.OK).json(mensaje);
		}).catch( () => {
			response.status(HttpStatus.FORBIDDEN).json({mensaje: 'Error al borrar los datos'});

		});
	}


}
