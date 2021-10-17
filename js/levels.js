// TuxMath JS
//
// Author: Julien Marin - projet Afrikalan  
// Contact: julien.marin@afrikalan.org
// Licence: AGPL-3.0-or-later, see COPYING file

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
// 
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.


let tmGlob_levelsSettings={
  //Additions
  "add1":  {
    "oper": ["add"],
    "first_operand_min": 1,
    "first_operand_max": 10,
    "add_addend_min": 1,
    "add_addend_max": 10
  },
  "add2":  {
    "oper": ["add"],
    "first_operand_min": 1,
    "first_operand_max": 10,
    "add_addend_min": 4,
    "add_addend_max": 20
  },
  
  
  //substractions
  "sub1":  {
    "oper": ["sub"],
    "first_operand_min": 1,
    "first_operand_max": 10,
    "sub_subtrahend_min": 1,
    "sub_subtrahend_max": 10
  },
  "sub2":  {
    "oper": ["sub"],
    "first_operand_min": 1,
    "first_operand_max": 20,
    "sub_subtrahend_min": 1,
    "sub_subtrahend_max": 10
  },
  
    //multiplications
  "mul1":  {
    "oper": ["mul"],
    "first_operand_min": -5,
    "first_operand_max": 5,
    "mul_multiplacand_min": -3,
    "mul_multiplacand_max": 3,
    "max_operators": 3
  },  "ba":  {
    "oper": ["mul", "div"],
    "first_operand_min": -5,
    "first_operand_max": 5,
    "div_dividand_min": -100,
    "div_dividand_max": 100,
    "mul_multiplacand_min": -3,
    "mul_multiplacand_max": 3,
    "max_operators": 3,
    "oper_mix_allowed": true,
    "mul_multiplacand_zeroallowed": false
  },

    //divisions
  "div1":  {
    "oper": ["div"],
    "first_operand_min": -100,
    "first_operand_max": 100,
    "div_divisor_min": -20,
    "div_divisor_max": 20
    
  },
  
  
  "test":  {
    "oper": ["sub", "add"],
    "first_operand_min": 1,
    "first_operand_max": 20,
    "sub_subtrahend_min": 0,
    "sub_subtrahend_max": 50,
    "max_operators":  5,
    "oper_mix_allowed": true
  }
}
