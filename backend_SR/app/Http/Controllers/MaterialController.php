<?php

namespace App\Http\Controllers;

use App\Models\Material;
use Illuminate\Http\Request;

class MaterialController extends Controller {

    // funcion para mostrar los materiales
    public function index() {
        return response()->json(Material::all(),200);
    }

    // funcion para crear materiales
    public function store(Request $request) {
        $request->validate(['nombre'=>'required|unique:material|max:50']);

        try {
            $material = Material::create($request->all());
            return response()->json(['mensaje'=>'Material creado','data'=>$material],201);

        } catch (\Exception $e) {
            return response()->json(['mensaje'=>'Error al crear material'],500);
        }
    }

    // funcion para mostrar los materiales
    public function show($id) {
        try {
            $material = Material::with('contenedores')->findOrFail($id);
            return response()->json($material,200);

        } catch (\Exception $e) {
            return response()->json(['mensaje'=>'Material no encontrado'],404);
        }
    }

    // funcion para actualizar material
    public function update(Request $request,$id){
        try {
            $material = Material::findOrFail($id);
            $material->update($request->all());
            return response()->json(['mensaje'=>'Material actualizado','data'=>$material],200);

        } catch (\Exception $e) {
            return response()->json(['mensaje'=>'Error al actualizar'],500);
        }
    }

    // funcion para eliminar material
    public function destroy($id){
        try {
            Material::destroy($id);
            return response()->json(['mensaje'=>'Material eliminado'],200);

        } catch (\Exception $e) {
            return response()->json(['mensaje'=>'Error al eliminar'],500);
        }
    }
}