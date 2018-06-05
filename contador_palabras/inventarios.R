library(readr)
library(stringr)

inventario_a1 <- read.delim('a1.csv', encoding = 'UTF-8')
colnames(inventario_a1) <- 'todo'
inventario_a1$todo <- as.character(inventario_a1$todo)
largo_todo <- length(inventario_a1$todo)
inventario_a1$limpio <- inventario_a1$todo

for (i in 1:largo_todo) {
  if(str_detect(inventario_a1$todo[i], '<li') | str_detect(inventario_a1$todo[i], '<td headers=')){
    
  } else {inventario_a1$limpio[i] <- 'NA'}
  
}

inventario_a1_2 <- inventario_a1[inventario_a1$limpio != 'NA',]


largo_nuevo <- length(inventario_a1_2$todo)

for (i in 1:largo_nuevo) {
    if(str_detect(inventario_a1_2$todo[i], 'a1>')){
    inventario_a1_2$todo[i] <- 'A1'

  } else if (str_detect(inventario_a1_2$todo[i], 'a2>')) {
    inventario_a1_2$todo[i] <- 'A2'
  
  } else {
  }
  
}


inventario_a1_2$todo <- str_replace(inventario_a1_2$todo, '<li>', '')
inventario_a1_2$todo <- str_replace(inventario_a1_2$todo, '</li>', '')

inventario_tageado <- as.data.frame(inventario_a1_2$todo) 

inventario_tageado$nivel <- c('1')
colnames(inventario_tageado) <- c('item', 'nivel')


for (i in 1:largo_nuevo) {
  if(inventario_tageado$item[i] == 'A1'){
    inventario_tageado$nivel[i] <- 'A1'
  } else if (inventario_tageado$item[i] == 'A2'){
    inventario_tageado$nivel[i] <- 'A2'
  } else {}
}

inventario_tageado$final <- c('1')


for (i in 1:largo_nuevo) {
  if(inventario_tageado$final[i] == 1 & inventario_tageado$nivel[i] == 1){
    inventario_tageado$final[i] <- inventario_tageado$nivel[i-1]
    inventario_tageado$nivel[i] <- inventario_tageado$nivel[i-1]}
   else {
  }
  
}


inventarioA1 <- inventario_tageado[inventario_tageado$final == 'A1',] 
inventarioA2 <- inventario_tageado[inventario_tageado$final == 'A2',] 



inventarioA1_list <- as.data.frame(unlist(str_split(inventarioA1$item, ',')))



inventarioA1_list$nos <- str_replace(inventarioA1_list$`unlist(str_split(inventarioA1$item, ","))`, '\\(no\\)', 'no')
inventarioA1_list$nos <- str_replace(inventarioA1_list$nos, '\\(s\\)', '')

 




#write.csv(,'inventario.csv',quote = FALSE, row.names = FALSE)



