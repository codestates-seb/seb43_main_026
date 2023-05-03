package com.codestates.category.repository;


import com.codestates.board.entity.Board;
import com.codestates.category.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    List<Board> findByCategoryId(long categoryId);

}
