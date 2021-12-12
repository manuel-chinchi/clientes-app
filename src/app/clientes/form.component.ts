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
      subscribe(response => {
        this.router.navigate(['/clientes'])
        swal('Nuevo Cliente', `Cliente ${response.nombre} creado con exito!`, 'success')
      }
    );
  }

  public update(): void {
    this.clienteService.update(this.cliente)
      .subscribe(cliente => {
        this.router.navigate(['/clientes'])
        swal('Cliente Actualizado', `Cliente ${cliente.nombre} actualizado con exito`, 'success')
      });
  }

}
