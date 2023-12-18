import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LibrosModel } from 'src/app/models/libro.model';
import { LibroService } from 'src/app/services/libro.service';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css']
})
export class LibroComponent {
  isUpdate: boolean = false;

  formLibro: FormGroup = new FormGroup({})

  listLibros: LibrosModel[] = []

  constructor(private libroService: LibroService){
    this.formLibro = new FormGroup({
      id: new FormControl(null),
      nombre: new FormControl(''),
      edicion: new FormControl(''),
      anio: new FormControl(''),
      detalle: new FormControl(''),
      imagen: new FormControl(''),
      estado: new FormControl(true)
    });

// podemos tambien hacerlo agregando el ngOnInit()
    this.list();
  }

  list(){
    this.libroService.getLibros().subscribe(res =>{
      if(res.success){
        this.listLibros = res.data;
      }
    });
  }

  newLibro(){
    this.formLibro.reset();
    this.isUpdate = false;
  }

  selectItem(item: any){
    this.isUpdate = true;
    this.formLibro.controls['id'].setValue(item.id);
    this.formLibro.controls['nombre'].setValue(item.nombre);
    this.formLibro.controls['edicion'].setValue(item.edicion);
    this.formLibro.controls['anio'].setValue(item.anio);
    this.formLibro.controls['detalle'].setValue(item.detalle);
    this.formLibro.controls['imagen'].setValue(item.imagen);
    this.formLibro.controls['estado'].setValue(item.estado);
  }

  save(){
    this.formLibro.controls['estado'].setValue(true);
    this.libroService.saveLibro(this.formLibro.value).subscribe(res =>{
      if(res){
      this.list;
      }
    });
  }

  update(){
    this.formLibro.controls['estado'].setValue(true);
    this.libroService.updateLibro(this.formLibro.value).subscribe(res =>{
      if(res){
      this.list;
      }
    });
  }

  delete(id: number){
    this.libroService.deleteLibro(id).subscribe(res =>{
      if(res){
      this.list;
      }
    });
  }
}
