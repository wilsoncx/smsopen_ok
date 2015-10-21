<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
  //Nome da tabela.
      protected $table      = 'clientes';

      //Primary Key da Tabela.
      protected $primaryKey = 'id';


      /**
       * Relacionamento com tabelas.
       */
      public function empresa()
      {
          return $this->belongsTo('App\Empresa');
      }

      public function grupo()
         {
           return $this->belongsToMany('App\Grupo','grupo_cliente', 'clientes_id', 'grupos_id');
    
         }

      public function mensagen()
            {
                return $this->belongsTo('App\Mensagen');
            }
      protected $fillable = ['nome', 'celular', 'email', 'empresa_id'];




}
