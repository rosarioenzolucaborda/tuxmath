let tmGlob_levelsSettings={
  //Additions
  "add1":  {
    "oper": ["add"],
    "first_operand_min": 1,
    "first_operand_max": 10,
    "add_right_addend_min": 1,
    "add_right_addend_max": 10
  },
  "add2":  {
    "oper": ["add"],
    "first_operand_min": 1,
    "first_operand_max": 10,
    "add_right_addend_min": 4,
    "add_right_addend_max": 20
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
    "first_operand_max": 10,
    "sub_subtrahend_min": 1,
    "sub_subtrahend_max": 10
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
