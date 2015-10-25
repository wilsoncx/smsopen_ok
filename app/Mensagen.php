<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Mensagen extends Model
{
  protected $table = 'mensagens';

  protected $primaryKey = 'id';

  public  $timestamps   = false;

  /**
   * Relacionamento com tabelas.
   */
  public function empresa()
  {
      return $this->belongsTo('App\Empresa');
  }

  public function clientes()
     {
         return $this->hasOne('App\Cliente');
     }


}
