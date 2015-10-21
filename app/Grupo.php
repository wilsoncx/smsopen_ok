<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Grupo extends Model
{

  //Nome da tabela.
      protected $table      = 'grupos';

      //Primary Key da Tabela.
      protected $primaryKey = 'id';

  /**
   * Relacionamento com tabelas.
   */
  public function empresa()
  {
      return $this->belongsTo('App\Empresa');
  }

  public function cliente()
   {
       return $this->belongsToMany('App\Cliente', 'grupo_cliente', 'grupos_id', 'clientes_id' );

   }
   public  $timestamps   = false;

   protected $fillable = ['nome', 'empresa_id', 'status'];


}
