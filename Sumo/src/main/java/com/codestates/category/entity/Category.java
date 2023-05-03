package com.codestates.category.entity;

import com.codestates.audit.Auditable;
import com.codestates.board.entity.Board;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Entity
public class Category  extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long categoryId;

    @Column(nullable = false, unique = true)
    private String categoryName;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    private List<Board> boards = new ArrayList<>();

}
