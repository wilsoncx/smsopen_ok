<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Mensagen;

class MensagemController extends Controller
{

  public function enviar($msg,$celular,$nome)
  {
    $explodenome = explode(" ", 	$nome);
    $primeironome = $explodenome[0];
    $novamsg = str_replace(" ","+",$msg);
    $corpomsg = "Sr.".$primeironome."+".$novamsg;

    $texto = "http://torpedus.com.br/sms/index.php?app=push&rest=private&u=9433&p=808745&to=$celular&msg=$corpomsg";
    $chsaida = curl_init($texto);
    curl_setopt($chsaida, CURLOPT_RETURNTRANSFER,true);
    curl_exec($chsaida);
    var_dump($chsaida);


  }


    public function last($n=3){
      return Mensagen::select('id', 'data','fone', 'cliente_id')
      ->with(['clientes'=>function($q){
        $q->select('id','nome');
      }])
        ->orderBy('id', 'data')
        ->take($n)
        ->get();
      }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function edit($id)
    {
        //
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
    public function destroy($id)
    {
        //
    }
}
