<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Foundation\Auth\Access\Authorizable;



class Empresa extends Model

{
      /**
       * Relacionamentos com tabelas.
       */
  public function clientes()
     {
         return $this->hasMany('App\Cliente');
     }


 public function users()
    {
        return $this->hasMany('App\User');
    }


public function mensagens()
   {
        return $this->hasMany('App\Mensagem');
   }


public function grupos()
  {
      return $this->hasMany('App\Grupo');
  }



  /**
   * The database table used by the model.
   *
   * @var string
   */
  protected $table = 'empresas';


  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = ['razao', 'telefone', 'endereco', 'cidade', 'uf', 'cnpj','qsms', 'ativo'];

  /**
   * The attributes excluded from the model's JSON form.
   *
   * @var array
   */
  protected $hidden = [''];
}
