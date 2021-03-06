<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Foundation\Auth\Access\Authorizable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;

class User extends Model implements AuthenticatableContract,
                                    AuthorizableContract,
                                    CanResetPasswordContract
{
    use Authenticatable, Authorizable, CanResetPassword;


    /**
     * Relacionamento com tabelas.
     */
     /**
      * Relacionamento com tabelas.
      */
     public function grupo_usuario()
     {
         return $this->belongsTo('App\Grupo_usuario');
     }


    public function empresa()
    {
        return $this->belongsTo('App\Empresa');
    }

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'users';


    //Primary Key da Tabela.
    protected $primaryKey = 'id';

    public  $timestamps   = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['id','nome', 'email', 'senha', 'empresa_id'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = ['senha'];
}
