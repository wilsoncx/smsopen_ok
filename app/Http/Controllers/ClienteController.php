<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Cliente;

class ClienteController extends Controller
{

  public function last(){
    return Cliente::select('id', 'nome','celular', 'email', 'status')
    ->orderBy('id', 'desc')
    ->get();
    throw new \Exception("Esta é uma exceção de teste");
    }

public function addGrupo($cliente_id, $grupo_id){
  Cliente::find($cliente_id)
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
      return Cliente::select('id', 'nome','celular', 'email', 'status')
      ->orderBy('id', 'desc')
      ->with(['grupo'=>function($q){
      $q->select('id','nome');
      }])
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
      $cliente = new Cliente;
      $cliente->nome = $request->nome;
      $cliente->celular = $request->celular;
      $cliente->email = $request->email;
      $cliente->status = $request->status;
      $cliente->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */

    public function edit($id, Request $request)
    {
      $cliente = Cliente::find($id);
      $input = \Input::json();
      $cliente->nome = $request->nome;
      $cliente->celular = $request->celular;
      $cliente->email = $request->email;
      $cliente->status = $request->status;

        $cliente->save();
        return response($cliente, 200)
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
      $cliente = Cliente::findOrFail($id);

      $cliente->delete();
        //
    }
}
