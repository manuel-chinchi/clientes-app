import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];

  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
    this.clienteService.getClientes().subscribe(
       clientes => this.clientes = clientes
    );
  }

  delete(cliente: Cliente) {
    swal({
      title: 'Está seguro?',
      text: `¿Seguro desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#308d56',
      cancelButtonColor: '',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, Cancelar!'
    }).then((result)=>{
      if (result.value) {

        this.clienteService.delete(cliente.id).subscribe(
          response => {

            // uso JS nativo para mostrar un elemento del array
            this.clientes = this.clientes.filter(c => c !== cliente)

            swal(
              'Cliente Eliminado!',
              `Cliente ${cliente.nombre} eliminado con éxito!`,
              'success'
            )
          }
        )

      }
    });
  }
}
