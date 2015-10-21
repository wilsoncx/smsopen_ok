<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Grupo_usuario extends Model
{
  /**
   * Relacionamento com tabelas.
   */
  public function user()
  {
      return $this->hasMany('App\User');
  }

}
