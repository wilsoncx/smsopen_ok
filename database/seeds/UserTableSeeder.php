<?php

use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

            DB::table('users')->insert([
              'nome' => "open.slz",
              'email' => 'open.slz@gmail.com',
              'senha' => bcrypt('acqwp'),
              'fone' =>  '9881544593',

          ]);
    }
}
