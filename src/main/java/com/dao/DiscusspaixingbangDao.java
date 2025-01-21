package com.dao;

import com.entity.DiscusspaixingbangEntity;
import com.baomidou.mybatisplus.mapper.BaseMapper;
import java.util.List;
import java.util.Map;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.plugins.pagination.Pagination;

import org.apache.ibatis.annotations.Param;
import com.entity.vo.DiscusspaixingbangVO;
import com.entity.view.DiscusspaixingbangView;


/**
 * 排行榜评论表
 * 
 * @author 
 * @email 
 * @date 2022-04-16 20:07:21
 */
public interface DiscusspaixingbangDao extends BaseMapper<DiscusspaixingbangEntity> {
	
	List<DiscusspaixingbangVO> selectListVO(@Param("ew") Wrapper<DiscusspaixingbangEntity> wrapper);
	
	DiscusspaixingbangVO selectVO(@Param("ew") Wrapper<DiscusspaixingbangEntity> wrapper);
	
	List<DiscusspaixingbangView> selectListView(@Param("ew") Wrapper<DiscusspaixingbangEntity> wrapper);

	List<DiscusspaixingbangView> selectListView(Pagination page,@Param("ew") Wrapper<DiscusspaixingbangEntity> wrapper);
	
	DiscusspaixingbangView selectView(@Param("ew") Wrapper<DiscusspaixingbangEntity> wrapper);
	

}
