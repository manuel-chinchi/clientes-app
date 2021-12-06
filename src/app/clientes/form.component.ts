import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  public cliente: Cliente = new Cliente();
  public titulo: string = "Crear cliente";

  constructor(
    private clienteService: ClienteService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  public create(): void {
    this.clienteService.create(this.cliente).subscribe(
      // crea el registro y redirige al listado de clientes
      response => this.router.navigate(['/clientes'])
    )
  }

}
