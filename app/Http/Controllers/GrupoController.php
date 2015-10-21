<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Grupo;


class GrupoController extends Controller
{

  public function addCliente($grupo_id, $cliente_id){
    Grupo::find($grupo_id)
    ->cliente()
    ->attach($cliente_id);

  }
public function rmCliente($grupo_id, $cliente_id)
{
  Grupo::find($grupo_id)
  ->cliente()
  ->detach($cliente_id);
}
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
     public function index()
     {
       return Grupo::select('id', 'nome','status')
       ->orderBy('id', 'desc')
       ->with(['cliente'=>function($q){
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
       $grupo = new Grupo;
       $grupo->nome = $request->nome;
       $grupo->save();
     }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
     public function edit($id, Request $request)
     {
       $grupo = Grupo::find($id);
       $input = \Input::json();
       $grupo->nome = $request->nome;
       $grupo->status = $request->status;

         $grupo->save();
         return response($grupo, 200)
             ->header('Content-Type', 'application/json');
     }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
     public function delete($id)
     {
       $grupo = Grupo::findOrFail($id);

       $grupo->delete();
         //
     }


}
