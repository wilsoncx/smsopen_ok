<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\User;

class UsuarioController extends Controller
{


public function addGrupo($usuario_id, $grupo_id){
  usuario::find($usuario_id)
  ->grupo()
  ->attach($grupo_id);

}
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
      return User::select('id', 'nome','email', 'status','fone', 'empresa_id')
      ->get();
      }

    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request)
    {
      //new
      $usuario = new User;
      $usuario->nome = $request->nome;
      $usuario->senha = $request->senha;
      $usuario->email = $request->email;
      $usuario->status = $request->status;
      $usuario->fone = $request->fone;
      $usuario->empresa_id = $request->empresa_id;

      $usuario->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */

    public function edit($id, Request $request)
    {
      $usuario = User::find($id);
      $input = \Input::json();
      $usuario->nome = $request->nome;
      $usuario->fone = $request->fone;
      $usuario->email = $request->email;
      $usuario->status = $request->status;
      $usuario->senha = $request->senha;
        $usuario->save();
        return response($usuario, 200)
            ->header('Content-Type', 'application/json');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id)
    {

        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function delete($id)
    {
      $usuario = usuario::findOrFail($id);

      $usuario->delete();
        //
    }
}
