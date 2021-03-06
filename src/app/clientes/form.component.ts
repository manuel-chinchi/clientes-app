import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  public cliente: Cliente = new Cliente();
  public titulo: string = "Crear cliente";

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private activatedRouter: ActivatedRoute
    ) { }

  ngOnInit() {
    this.cargarCliente();
  }

  cargarCliente(): void {
    this.activatedRouter.params.subscribe(params => {
        // checkeo si existe el cliente
        let id = params['id'];
        if (id) {
          this.clienteService.getCliente(id).subscribe((cliente) => this.cliente = cliente)
        }
      }
    )
  }

  public create(): void {
    this.clienteService.create(this.cliente).
      subscribe(json => {
        this.router.navigate(['/clientes'])
        swal('Nuevo Cliente', `${json.mensaje} : ${json.cliente.nombre}`, 'success')
      }
    );
  }

  public update(): void {
    this.clienteService.update(this.cliente)
      .subscribe(json => {
        this.router.navigate(['/clientes'])
        swal('Cliente Actualizado', `${json.mensaje} : ${json.cliente.nombre}`, 'success')
      });
  }

}
