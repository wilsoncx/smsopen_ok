<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::group(['prefix' => 'api'], function()
{
  Route::group(['prefix' => 'clientes'], function()
  {
    Route::get('', 'ClienteController@index');
    Route::post('', 'ClienteController@store');
    Route::get('{id}', 'ClienteController@show');
    Route::put('{id}', 'ClienteController@edit');
    Route::delete('{id}', 'ClienteController@delete');
    Route::post('{id}/{gp}', 'ClienteController@addGrupo');
  });
  Route::group(['prefix' => 'grupos'], function()
  {
    Route::get('', 'GrupoController@index');
    Route::post('', 'GrupoController@store');
    Route::post('{id}/{cl}', 'GrupoController@addCliente');
    Route::get('{id}', 'GrupoController@show');
    Route::put('{id}', 'GrupoController@edit');
    Route::delete('{id}', 'GrupoController@delete');
    Route::delete('{id}/{cl}', 'GrupoController@rmCliente');

  });
  Route::group(['prefix' => 'usuarios'], function()
  {
    Route::get('', 'UsuarioController@index');
    Route::post('', 'UsuarioController@store');
    Route::put('{id}', 'UsuarioController@edit');
  });

  Route::group(['prefix' => 'empresas'], function()
  {
    Route::get('', 'EmpresaController@index');

  });
  Route::group(['prefix' => 'msg'], function()
  {
    Route::post('{c}/{n}', 'MensagemController@enviar');

  });

});
Route::get('/', function () {
  return Redirect::to('/index.html');
});
Route::get('routes', function() {
  Artisan::call('route:list'); return "<pre>".
  Artisan::output();
});
