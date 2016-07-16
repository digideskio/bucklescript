

let generate_mk arity = 
  let arity_s = string_of_int arity in
  let fmt = format_of_string {|external js_fn_mk%s : (%s) -> (%s [@bs]) = "js_fn_mk" "%s" |} in
  if arity = 0 then 
    let ty = "unit -> 'a0" in
    Printf.sprintf fmt arity_s ty ty  arity_s
  else 
    let args = Array.to_list (Array.init (arity + 1) (fun i -> "'a" ^ string_of_int i)) in 
    let ty = String.concat " -> " args  in 
    Printf.sprintf fmt arity_s ty ty arity_s 

let generate_call_back_mk arity = 
  let arity_s = string_of_int (arity + 1) in
  let fmt = format_of_string {|external js_fn_method%s : (%s) -> (%s [@bs.this]) = "js_fn_method" "%s" |} in
  let args = Array.to_list (Array.init (arity + 1) (fun i -> "'a" ^ string_of_int i)) in 
  let ty = String.concat " -> " ("'obj":: args)  in 
  Printf.sprintf fmt arity_s ty ty arity_s 

let generate_run arity = 
  let arity_s = string_of_int arity in
  let fmt = format_of_string {|external js_fn_run%s : (%s [@bs]) -> (%s ) = "js_fn_run" "%s" |} in
  if arity = 0 then 
    let tya = "unit -> 'a0" in
    let tyb = "'a0" in
    Printf.sprintf fmt arity_s tya tyb  arity_s
  else 
    let args = Array.to_list (Array.init (arity + 1) (fun i -> "'a" ^ string_of_int i)) in 
    let ty = String.concat " -> " args  in 
    Printf.sprintf fmt arity_s ty ty arity_s 

let generate_method_run arity = 
  let arity_s = string_of_int arity in
  let fmt = format_of_string {|external js_method_run%s : (%s [@bs.meth]) -> (%s ) = "js_method_run" "%s" |} in
  if arity = 0 then 
    let tya = "unit -> 'a0" in
    let tyb = "'a0" in
    Printf.sprintf fmt arity_s tya tyb  arity_s
  else 
    let args = Array.to_list (Array.init (arity + 1) (fun i -> "'a" ^ string_of_int i)) in 
    let ty = String.concat " -> " args  in 
    Printf.sprintf fmt arity_s ty ty arity_s 


let prelude = {|
(* Copyright (C) 2015-2016 Bloomberg Finance L.P.
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * In addition to the permissions granted to you by the LGPL, you may combine
 * or link a "work that uses the Library" with a publicly distributed version
 * of this file to produce a combined library or application, then distribute
 * that combined work under the terms of your choosing, with no requirement
 * to comply with the obligations normally placed on you by section 4 of the
 * LGPL version 3 (or the corresponding section of a later version of the LGPL
 * should you choose to use a later version).
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 * 
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA 02111-1307, USA. *)


external (!)  : 'a Js.t -> 'a = "js_unsafe_downgrade"

external js_debugger : unit -> unit = "js_debugger"

external js_pure_expr : string -> 'a = "js_pure_expr"
external js_pure_stmt : string -> 'a = "js_pure_stmt"
external js_unsafe_downgrade : 'a Js.t -> 'a = "js_unsafe_downgrade"
|}

let () = 
  let arities = Array.to_list (Array.init 10 (fun i -> i)) in 
  let code = 
    List.map generate_mk arities  @
    List.map generate_call_back_mk arities @
    List.map generate_run arities @ 
    List.map generate_method_run arities in 
  print_endline (prelude ^ String.concat "\n" code )

(**

*)
(**
{[
[%bs.obj: < bark : string -> int [@bs.method] >
]}
*)

(* local variables: *)
(* compile-command: "ocaml js_unsafe_gen.ml > ../jscomp/runtime/js_unsafe.ml" *)
(* end: *)
